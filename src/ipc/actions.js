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

import {createAction} from "redux-actions";
import * as actionTypes from "./constants";

export const changeState = createAction(actionTypes.ChangeState);
export const openSyncFolder = createAction(actionTypes.OpenSyncFolder);
export const calculateUsedVolume = createAction(actionTypes.CalculateUsedVolume);
export const installJRE = createAction(actionTypes.InstallJRE);
export const storjGenerateMnemonic = createAction(actionTypes.StorjGenerateMnemonic);
export const storjLogin = createAction(actionTypes.StorjLogin);
export const storjCreateAccount = createAction(actionTypes.StorjCreateAccount);
export const siaRequestWalletInfo = createAction(actionTypes.SiaRequestWalletInfo);
export const stopSyncApps = createAction(actionTypes.StopSyncApps);
