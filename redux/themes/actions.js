import * as ActionTypes from './constants';

// eslint-disable-next-line import/prefer-default-export
export const selectTheme = name => (
  { type: ActionTypes.SELECT_THEME, name }
);
