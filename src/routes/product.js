import fs from 'fs';
import Router from 'koa-router';
import processAppRequest from '../utils/processAppRequest.js';
import productStore from '../apps/product/stores/index.js';
import productRoutes from '../apps/product/routes.js';

const indexHTML = fs.readFileSync(__dirname + '/../apps/product/index.html').toString();

const router = new Router();

export default (app) => {
  router.get('/product', async (ctx, next) => {
    try {
      await next(); // next is now a function
      const store = productStore();
      const html = await processAppRequest(null, null, ctx.request.url, store, productRoutes, indexHTML);
      ctx.body = html;
      ctx.status = 200;
      ctx.type = 'text/html';
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  });

  router.get('/product/:id/build', async (ctx, next) => {
    try {
      await next(); // next is now a function
      const store = productStore();
      const html = await processAppRequest(null, null, ctx.request.url, store, productRoutes, indexHTML);
      ctx.body = html;
      ctx.status = 200;
      ctx.type = 'text/html';
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  });

  router.get('/product/:id/part', async (ctx, next) => {
    try {
      await next(); // next is now a function
      const store = productStore();
      const html = await processAppRequest(null, null, ctx.request.url, store, productRoutes, indexHTML);
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
