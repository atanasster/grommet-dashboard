import moment from 'moment';
import 'isomorphic-unfetch';
import * as ActionTypes from './constants';

const npmRetrieveStats = npmPackage => (dispatch) => {
  if (npmPackage && npmPackage.stats === undefined) {
    fetch(`https://api.npms.io/v2/package/${npmPackage.name}`)
      .then(response => response.json())
      .then(data => dispatch({
        type: ActionTypes.NPM_RETRIEVE_STATS,
        packageName: npmPackage.name,
        data,
      }));
  }
};

const npmUpdateIntervalData = packageName =>
  ({ type: ActionTypes.NPM_UPDATE_INTERVAL_DATA, packageName });

const npmRetrieveHistory = (npmPackage, period) => (dispatch, getState) => {
  const startDate = moment();
  const { period: oldPeriod, interval } = getState().npm;
  if (oldPeriod !== period || !npmPackage.history || !npmPackage[interval]) {
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
    fetch(`https://api.npmjs.org/downloads/range/${startDate.format('YYYY-MM-DD')}:${moment().format('YYYY-MM-DD')}/${npmPackage.name}`)
      .then(response => response.json())
      .then((data) => {
        dispatch({ type: ActionTypes.NPM_RETRIEVE_HISTORY, packageName: npmPackage.name, data });
        dispatch(npmUpdateIntervalData(npmPackage.name));
      });
  }
};

const packagesGetAllData = period => (dispatch, getState) => {
  const { packages } = getState().npm;
  packages.forEach((npmPackage) => {
    dispatch(npmRetrieveStats(npmPackage));
    dispatch(npmRetrieveHistory(npmPackage, period));
  });
  dispatch({ type: ActionTypes.NPM_CHANGE_PERIOD, period });
};

export const npmSetPackages = packageNames => (dispatch, getState) => {
  dispatch({ type: ActionTypes.NPM_SET_PACKAGES, packages: packageNames });
  const { period } = getState().npm;
  dispatch(packagesGetAllData(period));
};

export const npmChangePeriod = period => (dispatch) => {
  dispatch(packagesGetAllData(period));
};

export const npmChangeInterval = interval => (dispatch) => {
  dispatch({ type: ActionTypes.NPM_CHANGE_INTERVAL, interval });
  dispatch(npmUpdateIntervalData());
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
