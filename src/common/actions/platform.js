import fetch from 'isomorphic-fetch';

export const CREATED_PLATFORM = 'CREATED_PLATFORM';
export const CREATING_PLATFORM = 'CREATING_PLATFORM';
export const SAVED_PLATFORM = 'SAVED_PLATFORM';
export const SAVING_PLATFORM = 'SAVING_PLATFORM';
export const FETCHED_PLATFORM = 'FETCHED_PLATFORM';
export const FETCHED_PLATFORMS = 'FETCHED_PLATFORMS';
export const CREATED_PART = 'CREATED_PART';
export const CREATING_PART = 'CREATING_PART';
export const SAVED_PART = 'SAVED_PART';
export const SAVING_PART = 'SAVING_PART';
export const DELETING_PART = 'DELETING_PART';
export const DELETED_PART = 'DELETED_PART';
export const DELETING_PLATFORM = 'DELETING_PLATFORM';
export const DELETED_PLATFORM = 'DELETED_PLATFORM';
export const CREATING_PART_GROUP = 'CREATING_PART_GROUP';
export const CREATED_PART_GROUP = 'CREATED_PART_GROUP';

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
        path: `/platform/${action.platform._id}/build`
      })
    }
  };
}

function deletingPart(platformId, partId) {
  return {
    type: DELETING_PART,
    platformId,
    partId
  };
}

function deletedPart(platformId, partId) {
  return {
    type: DELETED_PART,
    platformId,
    partId
  };
}

function deletingPlatform(platform) {
  return {
    type: DELETING_PLATFORM,
    platform
  };
}

function deletedPlatform(platform) {
  return {
    type: DELETED_PLATFORM,
    platform
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

function fetchedPlatforms(platforms) {
  return {
    type: FETCHED_PLATFORMS,
    platforms,
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
      .then(response => response.json())
      .then(json => dispatch(createdPlatform(json)));
  };
}

function putPlatform(platform) {
  return dispatch => {
    dispatch(savingPlatform(platform));
    return fetch(`/api/platform/${platform._id}`, {
      method: 'put',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(platform)
    })
      .then(response => response.json())
      .then(json => dispatch(savedPlatform(json)));
  };
}

function getPlatform(platformId) {
  return dispatch => fetch(`http://localhost:5000/api/platform/${platformId}`)
      .then(response => response.json())
      .then(json => dispatch(fetchedPlatform(json)))
      .catch(error => {
        console.log(`fetch platform failed ${error}`);
      });
}

function getPlatforms() {
  return dispatch => fetch('http://localhost:5000/api/platforms')
      .then(response => response.json())
      .then(json => dispatch(fetchedPlatforms(json)))
      .catch(error => {
        console.log(`fetch platforms failed ${error}`);
      });
}

function postPart(part) {
  return dispatch => {
    dispatch(creatingPart(part));
    return fetch(`/api/platform/${part._createdPlatformId}/part`, {
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

function putPart(part) {
  return dispatch => {
    dispatch(savingPart(part));
    return fetch(`/api/platform/${part._createdPlatformId}/part/${part._id}`, {
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

function deletePart(platformId, partId) {
  return dispatch => {
    dispatch(deletingPart(platformId, partId));
    return fetch(`/api/platform/${platformId}/part/${partId}`, {
      method: 'delete'
    })
      .then(() => dispatch(deletedPart(platformId, partId)));
  };
}

function deletePlatform(platform) {
  return dispatch => {
    dispatch(deletingPlatform(platform));
    return fetch(`/api/platform/${platform._id}`, {
      method: 'delete'
    })
      .then(() => dispatch(deletedPlatform(platform)));
  };
}

export function createPlatform(platform) {
  return (dispatch) => dispatch(postPlatform(platform));
}

export function savePlatform(platform) {
  return (dispatch) => dispatch(putPlatform(platform));
}

export function createPart(part) {
  return (dispatch) => dispatch(postPart(part));
}

export function savePart(part) {
  return (dispatch) => dispatch(putPart(part));
}

export function removePlatform(platformId) {
  return (dispatch, getState) => {
    const platform = getState().platforms.platformsById[platformId];
    return dispatch(deletePlatform(platform));
  };
}


export function removePart(platformId, partId) {
  return dispatch => dispatch(deletePart(platformId, partId));
}

// Create a part and add it to the platform right away
export function createPartAndSavePlatform(part) {
  return dispatch => dispatch(createPart(part));
}

export function removePartAndSavePlatform(platformId, partId) {
  return dispatch => dispatch(removePart(platformId, partId));
}

export function fetchPlatform(params) {
  return (dispatch, getState) => {
    const state = getState();
    let isFetch = true;

    if (state.platforms.platformsById && state.platforms.platformsById[params.platformId] && !state.platforms.platformsById[params.platformId].didInvalidate) {
      isFetch = false;
    }

    return isFetch ? dispatch(getPlatform(params.platformId)) : Promise.resolve();
  };
}

// this will be used to fetch all platforms...at some point we will want to paginate this...TODO
export function fetchPlatforms() {
  return (dispatch, getState) => {
    const state = getState();
    let isFetch = true;

    if (state.platforms.platformsById && Object.keys(state.platforms.platformsById).length > 0) {
      isFetch = false;
    }

    return isFetch ? dispatch(getPlatforms()) : Promise.resolve();
  };
}

export function activatePlatform(platformId) {
    // I think this should be fine for now, just use put
    // to update the active flag
    // TODO: Might need to fetch categories again after this
  return (dispatch) => dispatch(putPlatform({ _id: platformId, active: true }));
}

export function addPartGroup(platformId, group) {
  return dispatch => {
    dispatch({ type: CREATING_PART_GROUP, platformId, group });
    return fetch(`/api/platform/${platformId}/group`, {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(group)
    })
      .then(response => response.json())
      .then(json => dispatch({ type: CREATED_PART_GROUP, platformId, group: json }));
  };
}
