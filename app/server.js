import http from 'http';
import fs from 'fs';
import React from 'react';
import { createMemoryHistory } from 'history';
import { RoutingContext, match} from 'react-router';
import { renderToString } from 'react-dom/server';
import Cookies from 'cookies';
import uuid from 'uuid';
import routes from './routes';
import write from './utils/write';

const history = createMemoryHistory();

const indexHTML = fs.readFileSync(__dirname + '/index.html').toString();
const mainJS = fs.readFileSync(__dirname + '/../public/js/main.js');
const styles = fs.readFileSync(__dirname + '/../public/styles/styles.css');
const htmlRegex = /¡HTML!/;

// const renderApp = (req, token, cb) => {
//   const path = req.url;
//   const htmlRegex = /¡HTML!/;
//   const dataRegex = /¡DATA!/;

//   const router = Router.create({
//     routes: getRoutes(token),
//     location: path,
//     onAbort: (redirect) => {
//       cb({redirect});
//     },
//     onError: (err) => {
//       console.log('Routing Error');
//       console.log(err);
//     }
//   });

//   router.run((Handler, state) => {
//     if (state.routes[0].name === 'not-found') {
//       let html = React.renderToStaticMarkup(<Handler/>);
//       cb({notFound: true}, html);
//       return;
//     }
//     // fetchData(token, state).then((data) => {
//     // let clientHandoff = { token, data: cache.clean(token) };
//     let html = React.renderToString(<Handler data={data} />);
//     let output = indexHTML.
//        replace(htmlRegex, html).
//        // replace(dataRegex, JSON.stringify(clientHandoff));
//     cb(null, output, token);
//     // });
//   });
// };

const app = http.createServer((req, res) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get('token') || uuid();
  cookies.set('token', token, { maxAge: 30 * 24 * 60 * 60 });
  switch (req.url) {
  case '/js/main.js':
    return write(mainJS, 'text/javascript', res);
  case '/favicon.ico':
    return write('haha', 'text/plain', res);
  case '/styles.css':
    return write(styles, 'text/css', res);
  default:
    const location = history.createLocation(req.url);
    console.log(location);
    console.log(routes);
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
        const html = renderToString(<RoutingContext {...renderProps}/>);
        const output = indexHTML.
          replace(htmlRegex, html);
        write(output, 'text/html', res);
      }
    });
  }
});

app.listen(process.env.PORT || 5000);

