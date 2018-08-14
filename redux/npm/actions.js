import moment from 'moment';
import * as ActionTypes from './constants';

export const npmRetrieveStats = packageName => (dispatch) => {
  fetch(`https://api.npms.io/v2/package/${packageName}`)
    .then(response => response.json())
    .then(data => dispatch({ type: ActionTypes.NPM_RETRIEVE_STATS, packageName, data }));
};

export const npmRetrieveHistory = (packageName, period, interval) => (dispatch) => {
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
    case '2 year':
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
      interval,
    }));
};


export const npmRemovePackage = packageName => (
  { type: ActionTypes.NPM_REMOVE_PACKAGE, packageName }
);
