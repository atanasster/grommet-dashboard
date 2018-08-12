import * as ActionTypes from './constants';

export const npmRetrieveStats = packageName => (dispatch) => {
  fetch(`https://api.npms.io/v2/package/${packageName}`)
    .then(response => response.json())
    .then(data => dispatch({ type: ActionTypes.NPM_RETRIEVE_STATS, packageName, data }));
};


export const npmRemoveStats = packageName => (
  { type: ActionTypes.NPM_REMOVE_STATS, packageName }
);

export const npmRetrieveHistory = packageName => (
  { type: ActionTypes.NPM_RETRIEVE_HISTORY, packageName }
);
