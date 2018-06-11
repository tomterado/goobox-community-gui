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

import {push} from "react-router-redux";
import * as screens from "../../../../src/render/installer/constants/screens";
import {mapDispatchToProps, mapStateToProps} from "../../../../src/render/installer/containers/storj-encryption-key";

describe("mapStateToProps", () => {

  it("maps state to encryptionKey", () => {
    const main = {
      storjAccount: {
        key: "xxx xxx xxxx"
      }
    };
    expect(mapStateToProps({main})).toEqual({
      encryptionKey: main.storjAccount.key
    });
  });

});

describe("mapDispatchToProps", () => {

  const dispatch = jest.fn();
  beforeEach(() => {
    dispatch.mockReset();
  });

  it("maps onClickBack to push StorjRegistration", () => {
    mapDispatchToProps(dispatch).onClickBack();
    expect(dispatch).toHaveBeenCalledWith(push(screens.StorjRegistration));
  });

  it("maps onClickNext to push StorjEmailConfirmation", () => {
    mapDispatchToProps(dispatch).onClickNext();
    expect(dispatch).toHaveBeenCalledWith(push(screens.StorjEmailConfirmation));
  });

});

