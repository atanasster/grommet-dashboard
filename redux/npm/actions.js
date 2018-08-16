import moment from 'moment';
import * as ActionTypes from './constants';

export const npmRetrieveStats = packageName => (dispatch) => {
  fetch(`https://api.npms.io/v2/package/${packageName}`)
    .then(response => response.json())
    .then(data => dispatch({ type: ActionTypes.NPM_RETRIEVE_STATS, packageName, data }));
};

export const npmRetrieveHistory = (packageName, period) => (dispatch) => {
  const startDate = moment();
  switch (period) {
    case '1 month':
      startDate.subtract(1, 'month');
      break;
    case '3 months':
      startDate.subtract(3, 'month');
      break;
    case '6 months':
      startDate.subtract(6, 'month');
      break;
    case '2 years':
      startDate.subtract(2, 'year');
      break;
    default:
      startDate.subtract(1, 'year');
      break;
  }
  fetch(`https://api.npmjs.org/downloads/range/${startDate.format('YYYY-MM-DD')}:${moment().format('YYYY-MM-DD')}/${packageName}`)
    .then(response => response.json())
    .then(data => dispatch({
      type: ActionTypes.NPM_RETRIEVE_HISTORY,
      packageName,
      data,
    }));
};


export const npmRemovePackage = packageName => (
  { type: ActionTypes.NPM_REMOVE_PACKAGE, packageName }
);

export const npmAddPackage = packageName => (dispatch, getState) => {
  dispatch({ type: ActionTypes.NPM_ADD_PACKAGE, packageName });
  const { period } = getState().npm;
  dispatch(npmRetrieveStats(packageName));
  dispatch(npmRetrieveHistory(packageName, period));
};

export const npmChangePeriod = period => (dispatch, getState) => {
  const { packages } = getState().npm;
  dispatch({
    type: ActionTypes.NPM_CHANGE_PERIOD,
    period,
  });
  packages.forEach((p) => {
    dispatch(npmRetrieveHistory(p.name, period));
  });
};

export const npmChangeInterval = interval => (dispatch, getState) => {
  const { packages, period } = getState().npm;
  dispatch({
    type: ActionTypes.NPM_CHANGE_INTERVAL,
    interval,
  });
  packages.forEach((p) => {
    dispatch(npmRetrieveHistory(p.name, period));
  });
};

export const npmSearchRequest = search => (dispatch) => {
  if (search && search.length > 1) {
    fetch(`https://api.npms.io/v2/search?q=${search}`)
      .then(response => response.json())
      .then(data => dispatch({
        type: ActionTypes.NPM_RETRIEVE_SEARCH,
        data: data.results,
        search,
      }));
  } else {
    dispatch({
      type: ActionTypes.NPM_RETRIEVE_SEARCH,
      data: [],
      search,
    });
  }
};

export const npmUpdateSearch = search => ({ type: ActionTypes.NPM_UPDATE_SEARCH, search });


export const npmClearSearch = () => ({ type: ActionTypes.NPM_CLEAR_SEARCH });
