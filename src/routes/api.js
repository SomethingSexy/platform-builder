import Router from 'koa-router';
import uuid from 'uuid';

const router = new Router();

// This will be temporary until we can connect to api server
export default (app) => {
  router.get('/api/categories', async (ctx, next) => {
    try {
      await next(); // next is now a function

      ctx.body = [{id: 1, name: 'Firearm'}];
      ctx.status = 200;
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  });

  router.post('/api/platform', async (ctx, next) => {
    try {
      await next(); // next is now a function
      console.log(ctx);
      ctx.body = Object.assign({}, ctx.request.body, {
        id: uuid.v4()
      });
      ctx.status = 200;
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  });

  router.put('/api/platform/:id', async (ctx, next) => {
    try {
      await next(); // next is now a function
      console.log(ctx);
      ctx.body = Object.assign({}, ctx.request.body);
      ctx.status = 200;
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  });

  router.get('/api/platform/:id', async (ctx, next) => {
    try {
      await next(); // next is now a function
      ctx.body = Object.assign({}, {
        id: ctx.params.id,
        category: {
          id: 1,
          name: 'Firearm'
        }
      });
      ctx.status = 200;
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  });

  return router.routes();
};
