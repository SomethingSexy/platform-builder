import http from 'http';
import fs from 'fs';
import React from 'react';
import { createMemoryHistory } from 'history';
import {Router, RoutingContext, match} from 'react-router';
import { renderToString } from 'react-dom/server';
import configureStore from './stores/index';
import Cookies from 'cookies';
import uuid from 'uuid';
import routes from './routes';
import write from './utils/write';
import { Provider } from 'react-redux';
import fetchComponentData from './utils/fetchComponentData';
import httpProxy from 'http-proxy';

const history = createMemoryHistory();

const indexHTML = fs.readFileSync(__dirname + '/index.html').toString();
const mainJS = fs.readFileSync(__dirname + '/../public/js/main.js');
const styles = fs.readFileSync(__dirname + '/../public/styles/styles.css');
const htmlRegex = /¡HTML!/;
const dataRegex = /¡DATA!/;

// setup temporary proxy server
const proxy = httpProxy.createProxyServer();


const app = http.createServer((req, res) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('token') || uuid();
  cookies.set('token', token, { maxAge: 30 * 24 * 60 * 60 });

  // something like this will probably stay
  if (req.url.startsWith('/rest')) {
    proxy.web(req, res, { target: 'http://localhost:9000' });
  } else {
    switch (req.url) {
    case '/js/main.js':
      return write(mainJS, 'text/javascript', res);
    case '/favicon.ico':
      return write('haha', 'text/plain', res);
    case '/styles.css':
      return write(styles, 'text/css', res);
    default:
      const location = history.createLocation(req.url);
      const store = configureStore();

      match({routes, location}, (error, redirectLocation, renderProps) => {
        // I think at this point we could add custom data to the renderProps to pass
        // to our components
        if (redirectLocation) {
          res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
          res.send(500, error.message);
        } else if (renderProps === null) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end();
        } else {
          console.log(renderProps.components);
          fetchComponentData(store.dispatch, renderProps.components, renderProps.params).then(() => {
            const initialData = store.getState();
            const html = renderToString(<Provider store={store}><RoutingContext {...renderProps}/></Provider>);
            const output = indexHTML.
              replace(htmlRegex, html).
              replace(dataRegex, JSON.stringify(initialData));
            write(output, 'text/html', res);
          });
        }
      });
    }
  }
});

app.listen(process.env.PORT || 5000);

// this is only temporary, we will create a true api server later
const temp = http.createServer((req, res) => {
  write(JSON.stringify({}), 'application/json', res);
});

temp.listen(9000);
