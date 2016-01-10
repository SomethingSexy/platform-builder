import fetch from 'isomorphic-fetch';

export const CREATED_PLATFORM = 'CREATED_PLATFORM';
export const CREATING_PLATFORM = 'CREATING_PLATFORM';
export const SAVED_PLATFORM = 'SAVED_PLATFORM';
export const SAVING_PLATFORM = 'SAVING_PLATFORM';
export const FETCHED_CATEGOIRES = 'FETCHED_CATEGOIRES';

function creatingPlatform(platform) {
  return {
    type: CREATING_PLATFORM,
    platform
  };
}

function createdPlatform(platform) {
  return {
    type: CREATED_PLATFORM,
    platform,
    receivedAt: Date.now(),
    meta: {
      transition: (prevState, nextState, action) => ({
        path: `/platform/${action.platform.id}/build`,
        query: {
          some: 'queryParam'
        },
        state: {
          some: 'state'
        }
      })
    }
  };
}


function savingPlatform(platform) {
  return {
    type: SAVING_PLATFORM,
    platform
  };
}

function savedPlatform(platform) {
  return {
    type: SAVED_PLATFORM,
    platform,
    receivedAt: Date.now()
  };
}

function fetchedCategories(json) {
  return {
    type: FETCHED_CATEGOIRES,
    categories: json,
    receivedAt: Date.now()
  };
}

function postPlatform(platform) {
  return dispatch => {
    dispatch(creatingPlatform(platform));
    return fetch('/api/platform', {
      method: 'post',
      body: JSON.stringify(platform)
    })
      .then(response => response.json()) // response.json returns a promise so it can return chunked data (I assume)
      .then(json => dispatch(createdPlatform(json)));
  };
}

function putPlatform(platform) {
  return dispatch => {
    dispatch(savingPlatform(platform));
    return fetch('/api/platform', {
      method: 'put',
      body: JSON.stringify(platform)
    })
      .then(response => response.json()) // response.json returns a promise so it can return chunked data (I assume)
      .then(json => dispatch(savedPlatform(json)));
  };
}

function fetchCategories() {
  return dispatch => {
    console.log('fetch');
    return fetch('http://localhost:5000/api/categories')
      .then(response => response.json()) // response.json returns a promise so it can return chunked data (I assume)
      .then(json => dispatch(fetchedCategories(json))) // TODO: This last peice does not work on server because of need for window?
      .catch(error => {
        console.log('fetch categories failed ' + error);
      });
  };
}

export function createPlatform(platform) {
  return (dispatch, getState) => {
    return dispatch(postPlatform(platform));
  };
}

export function savePlatform(platform) {
  return (dispatch, getState) => {
    return dispatch(putPlatform(platform));
  };
}

export function getCategories() {
  return (dispatch, getState) => {
    return dispatch(fetchCategories());
  };
}
