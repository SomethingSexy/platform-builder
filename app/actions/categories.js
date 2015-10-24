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
  return dispatch => {
    return fetch('http://localhost:5000/api/categories')
      .then(response => response.json()) // response.json returns a promise so it can return chunked data (I assume)
      .then(json => dispatch(fetchedCategories(json))) // TODO: This last peice does not work on server because of need for window?
      .catch(error => {
        console.log('fetch categories failed ' + error);
      });
  };
}

export function getCategories() {
  return (dispatch, getState) => {
    return dispatch(fetchCategories());
  };
}
