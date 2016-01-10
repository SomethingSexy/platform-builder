import http from 'http';
import https from 'https';
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

// const options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem'),
//   requestCert: false,
//   rejectUnauthorized: false
// };

const app = http.createServer((req, res) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('token') || uuid.v4();
  cookies.set('token', token, { maxAge: 30 * 24 * 60 * 60 });

  // something like this will probably stay
  if (req.url.startsWith('/api')) {
    proxy.web(req, res, { target: 'http://localhost:9000' });
  } else {
    switch (req.url) {
    case '/js/main.js':
      write(mainJS, 'text/javascript', res);
      break;
    case '/favicon.ico':
      write('haha', 'text/plain', res);
      break;
    case '/styles.css':
      write(styles, 'text/css', res);
      break;
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
          res.end();
        } else if (renderProps === null) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end();
        } else {
          fetchComponentData(store.dispatch, renderProps.components, renderProps.params).then(() => {
            const initialData = store.getState();
            console.log(initialData);
            const html = renderToString(<Provider store={store}><RoutingContext {...renderProps}/></Provider>);
            const output = indexHTML.
              replace(htmlRegex, html).
              replace(dataRegex, JSON.stringify(initialData));
            write(output, 'text/html', res);
          })
          .catch((fetchError) => {
            console.log('fetcherror ');
            res.send(500, 'Fetch failed');
            res.end();
          });
        }
      });
    }
  }
});

app.listen(process.env.PORT || 5000);

// this is only temporary, we will create a true api server later
const temp = http.createServer((req, res) => {
  switch (req.url) {
  case '/api/platform':
    if (req.method === 'POST') {
      let data = '';

      req.on('data', (chunk) => {
        data += chunk;
      });

      req.on('end', () => {
        write(JSON.stringify(Object.assign({}, JSON.parse(data), {
          id: uuid.v4()
        })), 'application/json', res);
      });
    } else if (req.method === 'PUT') {
      let data = '';

      req.on('data', (chunk) => {
        data += chunk;
      });

      req.on('end', () => {
        write(JSON.stringify(Object.assign({}, JSON.parse(data), {
   
        })), 'application/json', res);
      });
    } else {
      res.writeHead(404);
      res.end();
    }
    break;
  case '/api/categories':
    if (req.method === 'GET') {
      write(JSON.stringify([{id: 1, name: 'Firearm'}]), 'application/json', res);
    }
    break;
  default:
    res.writeHead(404);
    res.end();
  }
});

temp.listen(9000);
