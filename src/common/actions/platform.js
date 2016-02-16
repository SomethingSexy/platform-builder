import fetch from 'isomorphic-fetch';

export const CREATED_PLATFORM = 'CREATED_PLATFORM';
export const CREATING_PLATFORM = 'CREATING_PLATFORM';
export const SAVED_PLATFORM = 'SAVED_PLATFORM';
export const SAVING_PLATFORM = 'SAVING_PLATFORM';
export const FETCHED_PLATFORM = 'FETCHED_PLATFORM';
export const CREATED_PART = 'CREATED_PART';
export const CREATING_PART = 'CREATING_PART';
export const DELETING_PART = 'DELETING_PART';
export const DELETED_PART = 'DELETED_PART';

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
        path: `/platform/${action.platform._id}/build`,
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

function deletingPart(part) {
  return {
    type: DELETING_PART,
    part
  };
}

function deletedPart(part) {
  return {
    type: DELETED_PART,
    part
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
  return {
    type: FETCHED_PLATFORM,
    platform,
    receivedAt: Date.now()
  };
}

function creatingPart(part) {
  return {
    type: CREATING_PART,
    part
  };
}

function createdPart(part) {
  return {
    type: CREATED_PART,
    part,
    receivedAt: Date.now(),
    meta: {
      transition: (prevState, nextState, action) => ({
        path: `/platform/${action.part._createdPlatformId}/build`
      })
    }
  };
}

function postPlatform(platform) {
  return dispatch => {
    dispatch(creatingPlatform(platform));
    return fetch('/api/platform', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(platform)
    })
      .then(response => response.json()) // response.json returns a promise so it can return chunked data (I assume)
      .then(json => dispatch(createdPlatform(json)));
  };
}

function putPlatform(platform) {
  return dispatch => {
    dispatch(savingPlatform(platform));
    return fetch('/api/platform/' + platform._id, {
      method: 'put',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
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

function postPart(part) {
  return dispatch => {
    dispatch(creatingPart(part));
    return fetch('/api/platform/' + part._createdPlatformId + '/part', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(part)
    })
      .then(response => response.json())
      .then(json => dispatch(createdPart(json)));
  };
}

function deletePart(part) {
  return dispatch => {
    dispatch(deletingPart(part));
    return fetch('/api/platform/' + part._createdPlatformId + '/part/' + part.id, {
      method: 'delete'
    })
      .then(() => dispatch(deletedPart(part)));
  };
}

export function createPlatform(platform) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    return dispatch(postPlatform(platform));
  };
}

export function savePlatform(platform) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    return dispatch(putPlatform(platform));
  };
}

export function createPart(part) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    return dispatch(postPart(part));
  };
}


export function removePart(pardId) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    const part = getState().partsById[pardId];
    return dispatch(deletePart(part));
  };
}

// Create a part and add it to the platform right away
export function createPartAndSavePlatform(part) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    return dispatch(createPart(part));
    // .then(() => {
    //   // const platform = getState().platformsById[part._createdPlatformId];
    //   return dispatch(createdPart(part));
    // });
  };
}

// Delete the part and remove it from the platform
// TODO: Maybe we should just do this on the server-side, the removing it
// from the platform
export function removePartAndSavePlatform(partId) {
  // remove part from platform (server will determine if it should delete the part out right)
  // then remove from partsById
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    return dispatch(removePart(partId))
    .then(() => {
      const state = getState();
      const part = state.partsById[partId];
      const platform = state.platformsById[part._createdPlatformId];
      return dispatch(savePlatform(platform));
    });
  };
}

export function fetchPlatform(params) {
  return (dispatch, getState) => {
    const state = getState();
    let isFetch = true;

    if (state.platformsById && state.platformsById[params.platformId] && !state.platformsById[params.platformId].didInvalidate) {
      isFetch = false;
    }

    return isFetch ? dispatch(getPlatform(params.platformId)) : Promise.resolve();
  };
}
