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

export default function reduce(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.NPM_RETRIEVE_STATS:
      return {
        ...state,
        packages:
          state.packages.map(p =>
            (p.name === action.packageName ? { ...p, stats: action.data } : p)),
      };
    case ActionTypes.NPM_REMOVE_STATS:
      return {
        ...state,
        packages: state.packages.filter(p => p.name !== action.packageName),
      };
    default:
      return state;
  }
}
