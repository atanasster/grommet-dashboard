import moment from 'moment';
import * as ActionTypes from './constants';

const initialState = {
  packages: [
    { name: 'material-ui' },
    { name: 'semantic-ui-react' },
    { name: 'react-bootstrap' },
    { name: 'antd' },
    { name: 'office-ui-fabric-react' },
    { name: 'grommet' },
  ],
  stats: {},
  history: {},
};

// group download dates from a sorted array by period
// dates are objects in format { day, downloads }
const groupDates = (dates, period) => {
  const groupedDates = [];
  if (!dates || dates.length === 0 || period === 'daily') {
    return [...dates];
  }
  const p = {
    weekly: 'week',
    monthly: 'month',
    yearly: 'year',
  };
  let firstDay = dates[dates.length - 1].day;
  while (firstDay > dates[0].day) {
    firstDay = moment(firstDay).subtract(1, p[period]).format('YYYY-MM-DD');
  }
  let lastPeriod = { day: moment(firstDay).add(1, p[period]).format('YYYY-MM-DD'), downloads: 0 };
  dates.forEach((date) => {
    if (date.day > lastPeriod.day) {
      lastPeriod = {
        day: moment(lastPeriod.day).add(1, p[period]).format('YYYY-MM-DD'),
        downloads: date.downloads,
      };
      groupedDates.push(lastPeriod);
    } else if (date.day >= firstDay) {
      lastPeriod.downloads += date.downloads;
    }
  });
  return groupedDates;
};

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.NPM_RETRIEVE_STATS:
      return {
        ...state,
        packages:
          state.packages.map(p =>
            (p.name === action.packageName ? { ...p, stats: action.data } : p)),
      };
    case ActionTypes.NPM_REMOVE_PACKAGE:
      return {
        ...state,
        packages: state.packages.filter(p => p.name !== action.packageName),
      };
    case ActionTypes.NPM_RETRIEVE_HISTORY:
      return {
        ...state,
        packages:
          state.packages.map(p =>
            (p.name === action.packageName ? {
              ...p,
              history: action.data,
              [action.interval]: groupDates(action.data.downloads, action.interval),
            } : p)),
      };
    default:
      return state;
  }
}
