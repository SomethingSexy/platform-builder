import fetch from 'isomorphic-fetch';

export const CREATED_PLATFORM = 'CREATED_PLATFORM';
export const CREATING_PLATFORM = 'CREATING_PLATFORM';
export const SAVED_PLATFORM = 'SAVED_PLATFORM';
export const SAVING_PLATFORM = 'SAVING_PLATFORM';
export const FETCHED_PLATFORM = 'FETCHED_PLATFORM';

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

function fetchedPlatform(platform) {
  console.log('fetchedPlatform action');
  console.log(platform);
  return {
    type: FETCHED_PLATFORM,
    platform,
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

function getPlatform(platformId) {
  return dispatch => {
    return fetch('http://localhost:5000/api/platform/' + platformId)
      .then(response => response.json()) // response.json returns a promise so it can return chunked data (I assume)
      .then(json => dispatch(fetchedPlatform(json))) // TODO: This last peice does not work on server because of need for window?
      .catch(error => {
        console.log('fetch platform failed ' + error);
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

export function fetchPlatform(params) {
  return (dispatch, getState) => {
    // TODO: getState here, see if we laoded already, if so don't do anything
    console.log(getState());
    return dispatch(getPlatform(params.platformId));
  };
}
