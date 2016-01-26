import fs from 'fs';
import React from 'react';
import { RoutingContext, match } from 'react-router';
import { Provider } from 'react-redux';
import fetchComponentData from './fetchComponentData.js';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory } from 'history';

const indexHTML = fs.readFileSync(__dirname + '/../apps/platform/index.html').toString();
const htmlRegex = /¡HTML!/;
const dataRegex = /¡DATA!/;

export default function processAppRequest(req, res, url, store, routes) {
  return new Promise((resolve, reject) => {
    const history = createMemoryHistory();
    console.log(url);
    const location = history.createLocation(url);
    // give the location we need to load
    // the corret router and store

    // if we don't load the exact same router file it seems to blow up on the checksum
    match({routes, location}, (error, redirectLocation, renderProps) => {
      // I think at this point we could add custom data to the renderProps to pass
      // to our components
      if (redirectLocation) {
        res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        res.send(500, error.message);
        res.end();
      } else if (renderProps === null) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end();
      } else {
        return fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
        .then(() => {
          const initialData = store.getState();
          const html = renderToString(<Provider store={store}><RoutingContext {...renderProps}/></Provider>);
          const output = indexHTML.
            replace(htmlRegex, html).
            replace(dataRegex, JSON.stringify(initialData));
          console.log(output);
          // write(output, 'text/html', res);
          resolve(output);
        })
        .catch((fetchError) => {
          console.log('fetcherror ' + fetchError);
          res.send(500, 'Fetch failed');
          res.end();
        });
      }
    });
  });

}
