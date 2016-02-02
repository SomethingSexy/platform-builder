import fetch from 'isomorphic-fetch';

export const CREATED_PART = 'CREATED_PART';
export const CREATING_PART = 'CREATING_PART';
export const SAVED_PART = 'SAVED_PART';
export const SAVING_PART = 'SAVING_PART';
export const FETCHED_PART = 'FETCHED_PART';

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
    receivedAt: Date.now()
    // meta: {
    //   transition: (prevState, nextState, action) => ({
    //     path: `/platform/${action.part.id}/build`,
    //     query: {
    //       some: 'queryParam'
    //     },
    //     state: {
    //       some: 'state'
    //     }
    //   })
    // }
  };
}


function savingPart(part) {
  return {
    type: SAVING_PART,
    part
  };
}

function savedPart(part) {
  return {
    type: SAVED_PART,
    part,
    receivedAt: Date.now()
  };
}

function fetchedPart(part) {
  return {
    type: FETCHED_PART,
    part,
    receivedAt: Date.now()
  };
}


function postPart(part) {
  return dispatch => {
    dispatch(creatingPart(part));
    return fetch('/api/platform/' + part.createdPlatformId + '/part', {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(part)
    })
      .then(response => response.json()) // response.json returns a promise so it can return chunked data (I assume)
      .then(json => dispatch(createdPart(json)));
  };
}

function putPart(part) {
  return dispatch => {
    dispatch(savingPart(part));
    return fetch('/api/part/' + part.createdPlatformId + '/part/' + part.id, {
      method: 'put',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(part)
    })
      .then(response => response.json()) // response.json returns a promise so it can return chunked data (I assume)
      .then(json => dispatch(savedPart(json)));
  };
}

function getPart(platformId) {
  return dispatch => {
    return fetch('http://localhost:5000/api/platform/' + platformId)
      .then(response => response.json()) // response.json returns a promise so it can return chunked data (I assume)
      .then(json => dispatch(fetchedPart(json))) // TODO: This last peice does not work on server because of need for window?
      .catch(error => {
        console.log('fetch platform failed ' + error);
      });
  };
}

export function createPart(part) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    return dispatch(postPart(part));
  };
}

export function savePart(part) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    return dispatch(putPart(part));
  };
}

export function fetchPlatform(params) {
  return (dispatch, getState) => {
    const state = getState();
    let isFetch = true;

    if (state.partsById && state.partsById[params.partId] && !state.partsById[params.partId].didInvalidate) {
      isFetch = false;
    }

    return isFetch ? dispatch(getPart(params.partId)) : Promise.resolve();
  };
}
