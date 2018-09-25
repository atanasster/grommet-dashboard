import { black, materiallight, materialdark, metro, dark, grommet, light } from 'grommet-controls/themes';
import * as ActionTypes from './constants';


const defaultTheme = 'light';


const initialState = {
  themes: {
    light,
    grommet,
    dark,
    black,
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
