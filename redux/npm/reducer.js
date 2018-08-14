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
  let lastPeriod = { day: null, downloads: 0 };
  dates.forEach((date) => {
    const startPeriod = moment(date.day, 'YYYY-MM-DD');
    let ts;
    if (period === 'weekly') {
      ts = startPeriod.startOf('week').format('YYYY-MM-DD');
    } else if (period === 'monthly') {
      ts = startPeriod.startOf('month').format('YYYY-MM-DD');
    } else if (period === 'yearly') {
      ts = startPeriod.startOf('year').format('YYYY-MM-DD');
    } else {
      throw new Error('invalid period');
    }
    if (ts !== lastPeriod.day) {
      lastPeriod = {
        day: ts,
        downloads: date.downloads,
      };
      groupedDates.push(lastPeriod);
    } else {
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
