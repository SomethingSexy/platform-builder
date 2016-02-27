// TODO: It might make sense to put some of these part methods in actions/platform.js
import fetch from 'isomorphic-fetch';

export const SAVED_PART = 'SAVED_PART';
export const SAVING_PART = 'SAVING_PART';
export const FETCHED_PART = 'FETCHED_PART';

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

function putPart(part) {
  return dispatch => {
    dispatch(savingPart(part));
    return fetch(`/api/parts/${part._id}`, {
      method: 'put',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(part)
    })
      .then(response => response.json())
      .then(json => dispatch(savedPart(json)));
  };
}

function getPart(platformId) {
  return dispatch => fetch(`http://localhost:5000/api/platform/${platformId}`)
    .then(response => response.json()) // response.json returns a promise so it can return chunked data (I assume)
    .then(json => dispatch(fetchedPart(json))) // TODO: This last peice does not work on server because of need for window?
    .catch(error => {
      console.log(`fetch part failed ${error}`);
    });
}

export function savePart(part) {
  return (dispatch) => dispatch(putPart(part));
}

export function fetchPart(params) {
  return (dispatch, getState) => {
    const state = getState();
    let isFetch = true;

    if (state.partsById && state.partsById[params.partId] && !state.partsById[params.partId].didInvalidate) {
      isFetch = false;
    }

    return isFetch ? dispatch(getPart(params.partId)) : Promise.resolve();
  };
}
