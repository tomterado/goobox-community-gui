/*
 * Copyright (C) 2017-2018 Junpei Kawamoto
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

"use strict";
import {execSync, spawn} from "child_process";
import log from "electron-log";
import jre from "node-jre";
import path from "path";
import readline from "readline";

const DefaultTimeout = 60000;

export default class Storj {

  constructor() {
    this.wd = path.normalize(path.join(__dirname, "../../goobox-sync-storj/"));
    this.cmd = "goobox-sync-storj";
    if (process.platform === "win32") {
      this.cmd += ".bat";
    }
    this.javaHome = path.join(jre.driver(), "../../");
    this.stdin = null;
    this.stdout = null;
    this.stderr = null;
    log.debug(`new storj instance: cmd = ${this.cmd}, wd = ${this.wd}, java-home = ${this.javaHome}`);
  }

  start(dir, reset) {

    if (this.proc) {
      return;
    }

    const args = ["--sync-dir", `"${dir}"`];
    if (reset) {
      args.push("--reset-db");
    }

    log.info(`starting ${this.cmd} in ${this.wd}`);
    this.proc = spawn(this.cmd, args, {
      cwd: this.wd,
      env: {
        JAVA_HOME: this.javaHome,
      },
      shell: true,
      windowsHide: true,
    });

    this.stdin = this.proc.stdin;
    this.stdout = readline.createInterface({input: this.proc.stdout});
    this.stderr = readline.createInterface({input: this.proc.stderr});
    this.stderr.on("line", log.verbose);

    this.proc.on("close", (code, signal) => {
      if (this.proc) {
        log.debug(`storj closed: code = ${code}, signal = ${signal}, killed = ${this.proc}`);
        this.proc = null;
      }
    });

  }

  async login(email, password, encryptionKey) {

    if (!this.proc) {
      throw "sync storj app is not running";
    }

    return Promise.race([
      new Promise(resolve => {

        this.stdout.once("line", resolve);

        const req = JSON.stringify({
          method: "login",
          args: {
            email: email,
            password: password,
            encryptionKey: encryptionKey,
          }
        }) + "\n";
        log.debug(`sending a request to sync storj: ${req}`);
        this.stdin.write(req);

      }),
      new Promise((_, reject) => setTimeout(reject.bind(null, "Login request timed out"), DefaultTimeout))
    ]).then(line => {
      try {
        return JSON.parse(line);
      } catch (err) {
        return Promise.reject(`Cannot parse ${line}: ${err}`);
      }
    }).then(res => {
      if ("ok" !== res.status) {
        return Promise.reject(res.message);
      }
    });

  }

  async createAccount(email, password) {

    if (!this.proc) {
      throw "sync storj app is not running";
    }

    return Promise.race([
      new Promise(resolve => {
        this.stdout.once("line", resolve);

        const req = JSON.stringify({
          method: "createAccount",
          args: {
            email: email,
            password: password,
          }
        }) + "\n";
        log.debug(`sending a request to sync storj: ${req}`);
        this.stdin.write(req);
      }),
      new Promise((_, reject) => setTimeout(reject.bind(null, "Registration timed out"), DefaultTimeout))
    ]).then(line => {
      try {
        return JSON.parse(line);
      } catch (err) {
        return Promise.reject(`Cannot parse ${line}: ${err}`);
      }
    }).then(res => {
      if ("ok" !== res.status) {
        return Promise.reject(res.message);
      }
      return res.encryptionKey;
    });

  }

  async close() {

    if (!this.proc) {
      return;
    }

    const promise = Promise.all([
      new Promise(resolve => {
        this.proc.once("exit", () => {
          log.info("the sync-storj app is exited");
          this.proc = null;
          resolve();
        });
      }),
      new Promise(resolve => {
        this.proc.once("close", () => {
          log.info("the streams of sync-storj app is closed");
          resolve();
        });
      })
    ]);

    log.info("closing the sync-storj app");
    if (process.platform === "win32") {
      execSync(`taskkill /pid ${this.proc.pid} /T /F`);
    } else {
      this.proc.kill("SIGTERM");
    }
    return promise;

  }

}
