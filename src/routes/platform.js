import fs from 'fs';
import Router from 'koa-router';
import processAppRequest from '../utils/processAppRequest.js';
import platformStore from '../apps/platform/stores/index.js';
import platformRoutes from '../apps/platform/routes.js';

const indexHTML = fs.readFileSync(__dirname + '/../apps/platform/index.html').toString();

const router = new Router();

export default (app) => {
  router.get('/platform', async (ctx, next) => {
    try {
      await next(); // next is now a function
      const store = platformStore();
      const html = await processAppRequest(null, null, ctx.request.url, store, platformRoutes, indexHTML);
      ctx.body = html;
      ctx.status = 200;
      ctx.type = 'text/html';
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  });

  router.get('/platform/:id/build', async (ctx, next) => {
    try {
      await next(); // next is now a function
      const store = platformStore();
      const html = await processAppRequest(null, null, ctx.request.url, store, platformRoutes, indexHTML);
      ctx.body = html;
      ctx.status = 200;
      ctx.type = 'text/html';
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  });

  router.get('/platform/:id/part', async (ctx, next) => {
    try {
      await next(); // next is now a function
      const store = platformStore();
      const html = await processAppRequest(null, null, ctx.request.url, store, platformRoutes, indexHTML);
      ctx.body = html;
      ctx.status = 200;
      ctx.type = 'text/html';
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  });

  return router.routes();
};
