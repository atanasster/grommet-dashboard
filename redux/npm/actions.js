import moment from 'moment';
import 'isomorphic-unfetch';
import * as ActionTypes from './constants';

export const npmRetrieveStats = packageName => (dispatch, getState) => {
  const stats = getState().npm.stats[packageName];
  if (stats === undefined) {
    fetch(`https://api.npms.io/v2/package/${encodeURIComponent(packageName)}`)
      .then(response => response.json())
      .then(data => dispatch({
        type: ActionTypes.NPM_RETRIEVE_STATS,
        packageName,
        data,
      }));
  }
};


const npmUpdateIntervalData = packageName =>
  ({ type: ActionTypes.NPM_UPDATE_INTERVAL_DATA, packageName });

export const npmRetrieveHistory = (packageName, period) => (dispatch, getState) => {
  const startDate = moment();
  const {
    period: oldPeriod, interval, history, intervals,
  } = getState().npm;
  if (oldPeriod !== period || !history[packageName]
    || !intervals[packageName]
    || !intervals[packageName][interval]) {
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
    fetch(`https://api.npmjs.org/downloads/range/${startDate.format('YYYY-MM-DD')}:${moment().format('YYYY-MM-DD')}/${encodeURIComponent(packageName)}`)
      .then(response => response.json())
      .then((data) => {
        dispatch({ type: ActionTypes.NPM_RETRIEVE_HISTORY, packageName, data });
        dispatch(npmUpdateIntervalData(packageName));
      });
  }
};

const packagesGetAllData = period => (dispatch, getState) => {
  const { packages } = getState().npm;
  packages.forEach((packageName) => {
    dispatch(npmRetrieveStats(packageName));
    dispatch(npmRetrieveHistory(packageName, period));
  });
};

export const npmSetPackages = packageNames => (dispatch, getState) => {
  dispatch({ type: ActionTypes.NPM_SET_PACKAGES, packages: packageNames });
  const { period } = getState().npm;
  dispatch(packagesGetAllData(period));
};

export const npmChangePeriod = (period, packages) => (dispatch) => {
  packages.forEach((packageName) => {
    dispatch(npmRetrieveHistory(packageName, period));
  });
  dispatch({ type: ActionTypes.NPM_CHANGE_PERIOD, period });
};


export const npmChangeInterval = (interval, packages) => (dispatch) => {
  dispatch({ type: ActionTypes.NPM_CHANGE_INTERVAL, interval });
  packages.forEach((packageName) => {
    dispatch(npmUpdateIntervalData(packageName));
  });
};

