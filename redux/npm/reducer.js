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
  search: '',
  searchResults: '',
  interval: 'weekly',
  period: '6 months',
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
    case ActionTypes.NPM_ADD_PACKAGE:
      console.log([...state.packages, action.packageName]);
      return {
        ...state,
        packages: [...state.packages, { name: action.packageName }],
      };
    case ActionTypes.NPM_CHANGE_PERIOD:
      return {
        ...state,
        period: action.period,
      };
    case ActionTypes.NPM_CHANGE_INTERVAL:
      return {
        ...state,
        interval: action.interval,
      };
    case ActionTypes.NPM_RETRIEVE_HISTORY:
      return {
        ...state,
        packages:
          state.packages.map(p =>
            (p.name === action.packageName ? {
              ...p,
              history: action.data,
              [state.interval]: groupDates(action.data.downloads, state.interval),
            } : p)),
      };
    case ActionTypes.NPM_UPDATE_SEARCH:
      return {
        ...state,
        search: action.search,
      };
    case ActionTypes.NPM_CLEAR_SEARCH:
      return {
        ...state,
        search: '',
        searchResults: undefined,
      };
    case ActionTypes.NPM_RETRIEVE_SEARCH:
      return {
        ...state,
        searchResults: Array.isArray(action.data) ? [...action.data] : undefined,
      };
    default:
      return state;
  }
}
