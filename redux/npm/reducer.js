import moment from 'moment';
import * as ActionTypes from './constants';

const initialState = {
  packages: [],
  interval: 'weekly',
  period: '6 months',
  stats: {},
  history: {},
  intervals: {},
};

// group download dates from a sorted array by period
// dates are objects in format { day, downloads }
const groupDates = (dates, period) => {
  const groupedDates = [];
  if (!dates) {
    return dates;
  }
  if (dates.length === 0 || period === 'daily') {
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
    case ActionTypes.NPM_SET_PACKAGES:
      return {
        ...state,
        packages: Array.isArray(action.packages) ? [...action.packages] : [],
      };
    case ActionTypes.NPM_RETRIEVE_STATS:
      return {
        ...state,
        stats: {
          ...state.stats,
          [action.packageName]: action.data ?
            { ...action.data, error: (action.data.message ? action.data.message : undefined) } : {},
        },
      };
    case ActionTypes.NPM_RETRIEVE_HISTORY:
      return {
        ...state,
        history: {
          ...state.history,
          [action.packageName]: action.data && !action.data.error ? action.data : [],
        },
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
    case ActionTypes.NPM_UPDATE_INTERVAL_DATA:
      return {
        ...state,
        intervals: {
          ...state.intervals,
          [action.packageName]: {
            ...(state.intervals[action.packageName] || {}),
            [state.interval]:
              state.history[action.packageName] && state.history[action.packageName].downloads ?
                groupDates(state.history[action.packageName].downloads, state.interval) : [],
          },
        },
      };

    default:
      return state;
  }
}
