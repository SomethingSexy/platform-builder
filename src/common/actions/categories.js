import fetch from 'isomorphic-fetch';

export const FETCHED_CATEGOIRES = 'FETCHED_CATEGOIRES';

function fetchedCategories(json) {
  return {
    type: FETCHED_CATEGOIRES,
    categories: json,
    receivedAt: Date.now()
  };
}

function fetchCategories() {
  return dispatch => fetch(new Request('http://localhost:5000/api/categories')) // was getting an issue when needed to loaded categories later, so switched to new Request()
    .then(response => response.json()) // response.json returns a promise so it can return chunked data (I assume)
    .then(json => dispatch(fetchedCategories(json))) // TODO: This last peice does not work on server because of need for window?
    .catch(error => {
      console.log(`fetch categories failed  ${error}`);
    });
}

export function getCategories() {
  return (dispatch, getState) => {
    const state = getState();
    let isFetch = true;

    if (state.categories && typeof state.categories.didInvalidate !== 'undefined' && !state.categories.didInvalidate) {
      isFetch = false;
    }

    return isFetch ? dispatch(fetchCategories()) : Promise.resolve();
  };
}
