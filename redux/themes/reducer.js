import { black, materiallight, materialdark, metro, light } from 'grommet-controls/themes';
import { grommet, dark } from 'grommet/themes';
import { aruba } from 'grommet-theme-aruba';
import { dxc } from 'grommet-theme-dxc';
import { hp } from 'grommet-theme-hp';
import { hpe } from 'grommet-theme-hpe';
import * as ActionTypes from './constants';


const defaultTheme = 'light';


const initialState = {
  themes: {
    light,
    aruba,
    black,
    dark,
    dxc,
    grommet,
    hp,
    hpe,
    materiallight,
    materialdark,
    metro,
  },
  selected: defaultTheme,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SELECT_THEME:
      return { ...state, selected: state.themes[action.name] ? action.name : defaultTheme };
    default:
      return state;
  }
};
