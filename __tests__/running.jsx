/*
 * Copyright (C) 2017 Junpei Kawamoto
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

import React from "react";
import {shallow} from "enzyme";
import Running from "../src/running";

describe("Running component", () => {

  it("has a pause button", () => {
    const fn = jest.fn();
    const wrapper = shallow(<Running onClickPauseSync={fn}/>);
    const pause = wrapper.find(".pause-sync-btn");
    expect(pause.exists()).toBeTruthy();

    pause.simulate("click");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("has a settings button", () => {
    const fn = jest.fn();
    const wrapper = shallow(<Running onClickSettings={fn}/>);
    const settings = wrapper.find(".settings-btn");
    expect(settings.exists()).toBeTruthy();

    settings.simulate("click");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("has an info button", () => {
    const fn = jest.fn();
    const wrapper = shallow(<Running onClickInfo={fn}/>);
    const info = wrapper.find(".info-btn");
    expect(info.exists()).toBeTruthy();

    info.simulate("click");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("has a sync folder button", () => {
    const fn = jest.fn();
    const wrapper = shallow(<Running onClickSyncFolder={fn}/>);
    const folder = wrapper.find(".sync-folder");
    expect(folder.exists()).toBeTruthy();

    folder.simulate("click");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("has an import drive button", () => {
    const fn = jest.fn();
    const wrapper = shallow(<Running onClickImportDrive={fn}/>);
    const drive = wrapper.find(".import-drive");
    expect(drive.exists()).toBeTruthy();

    drive.simulate("click");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("has a usage text box", () => {
    const used = 12;
    const wrapper = shallow(<Running usedVolume={used}/>);
    const usage = wrapper.find(".usage");
    expect(usage.exists()).toBeTruthy();
    expect(usage.text()).toEqual(`Usage: ${used}GB`);
  });

  it("has a usage percentage box", () => {
    const used = 12;
    const total = 48;
    const wrapper = shallow(<Running usedVolume={used} totalVolume={total}/>);
    const usage = wrapper.find(".usage-rate");
    expect(usage.exists()).toBeTruthy();
    expect(usage.text()).toEqual(`${Math.round(used / total * 100)}% of ${total}GB`);
  });

  it("has a usage bar", () => {
    const used = 10;
    const total = 30;
    const wrapper = shallow(<Running usedVolume={used} totalVolume={total}/>);
    const usageBar = wrapper.find(".bar");
    expect(usageBar.exists()).toBeTruthy();
    expect(usageBar.prop("style")).toEqual({
      width: `${Math.round(used / total * 100)}%`
    });
  });

});

