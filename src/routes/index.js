// main entry for all application specific routes, this will take what the SPA is looking for
// and connect them to the outside world
import mount from 'koa-mount';
import convert from 'koa-convert';
import platformRoutes from './platform.js';
import apiRoutes from './api.js';

export default (app) => {
  app.use(convert(mount('/', platformRoutes(app))));
  app.use(convert(mount('/', apiRoutes(app))));
};
