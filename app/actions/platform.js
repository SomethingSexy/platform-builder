import fetch from 'isomorphic-fetch';

export const CREATED_PLATFORM = 'CREATED_PLATFORM';
export const CREATING_PLATFORM = 'CREATING_PLATFORM';

// export const REQUEST_POSTS = 'REQUEST_POSTS';
// export const RECEIVE_POSTS = 'RECEIVE_POSTS';
// export const SELECT_REDDIT = 'SELECT_REDDIT';
// export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT';

// export function selectReddit(reddit) {
//   return {
//     type: SELECT_REDDIT,
//     reddit
//   };
// }

// export function invalidateReddit(reddit) {
//   return {
//     type: INVALIDATE_REDDIT,
//     reddit
//   };
// }

// function requestPosts(reddit) {
//   return {
//     type: REQUEST_POSTS,
//     reddit
//   };
// }

// function receivePosts(reddit, json) {
//   return {
//     type: RECEIVE_POSTS,
//     reddit: reddit,
//     posts: json.data.children.map(child => child.data),
//     receivedAt: Date.now()
//   };
// }

// function fetchPosts(reddit) {
//   return dispatch => {
//     dispatch(requestPosts(reddit));
//     return fetch(`http://www.reddit.com/r/${reddit}.json`)
//       .then(response => response.json())
//       .then(json => dispatch(receivePosts(reddit, json)));
//   };
// }

// function shouldFetchPosts(state, reddit) {
//   const posts = state.postsByReddit[reddit];
//   if (!posts) {
//     return true;
//   }
//   if (posts.isFetching) {
//     return false;
//   }
//   return posts.didInvalidate;
// }

// export function fetchPostsIfNeeded(reddit) {
//   return (dispatch, getState) => {
//     if (shouldFetchPosts(getState(), reddit)) {
//       return dispatch(fetchPosts(reddit));
//     }
//   };
// }

function creatingPlatform(platform) {
  return {
    type: CREATING_PLATFORM,
    platform
  };
}

function createdPlatform(json) {
  return {
    type: CREATED_PLATFORM,
    platform: json,
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


export function createPlatform(platform) {
  return (dispatch, getState) => {
    return dispatch(postPlatform(platform));
  };
}
