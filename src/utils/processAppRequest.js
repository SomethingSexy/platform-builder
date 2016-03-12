import React from 'react';
import { RouterContext, match } from 'react-router';
import { Provider } from 'react-redux';
import fetchComponentData from './fetchComponentData.js';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory } from 'history';

const htmlRegex = /¡HTML!/;
const dataRegex = /¡DATA!/;

// maybe this should have a parameter for the js/css instead?
export default function processAppRequest(url, store, routes, indexHTML) {
  return new Promise((resolve, reject) => {
    const history = createMemoryHistory();
    const location = history.createLocation(url);
    // give the location we need to load
    // the corret router and store

    // if we don't load the exact same router file it seems to blow up on the checksum
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      // I think at this point we could add custom data to the renderProps to pass
      // to our components
      if (redirectLocation) {
        reject({
          status: 301,
          uri: redirectLocation.pathname + redirectLocation.search
        });
      } else if (error) {
        reject({
          status: 500,
          message: error.message
        });
      } else if (renderProps === null) {
        reject({
          status: 404
        });
      } else {
        return fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
        .then(() => {
          const initialData = store.getState();
          const html = renderToString(<Provider store={store}><RouterContext {...renderProps} /></Provider>);
          const output = indexHTML.
            replace(htmlRegex, html).
            replace(dataRegex, JSON.stringify(initialData));
          resolve(output);
        })
        .catch((fetchError) => {
          reject({
            status: 500,
            message: fetchError
          });
        });
      }
    });
  });
}
