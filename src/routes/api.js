import Router from 'koa-router';
import 'isomorphic-fetch';
import uuid from 'uuid';

const router = new Router();

const missingIdError = 'Id is required for this api.';

/* eslint-disable no-param-reassign */
export default (app) => {
  router.get('/api/categories', async (ctx, next) => {
    try {
      await next();
      const response = await fetch(`${process.env.API_SRV_URL}/api/categories`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      ctx.body = await response.json();
      ctx.status = 200;
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  });

  // create a platform
  // this can get called with just a category Id
  router.post('/api/platform', async (ctx, next) => {
    try {
      await next();
      const response = await fetch(`${process.env.API_SRV_URL}/api/platforms`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ctx.request.body)
      });
      ctx.body = await response.json();
      ctx.status = 200;
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  });

  router.get('/api/platforms', async (ctx, next) => {
    try {
      await next();
      const response = await fetch(`${process.env.API_SRV_URL}/api/platforms`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      ctx.body = await response.json();
      ctx.status = 200;
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  });


  router.put('/api/platform/:id', async (ctx, next) => {
    try {
      await next();
      if (!ctx.params.id) {
        ctx.status = 400;
        ctx.status = missingIdError;
        return;
      }
      const response = await fetch(`${process.env.API_SRV_URL}/api/platforms/${ctx.params.id}`, {
        method: 'put',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ctx.request.body)
      });

      // TODO: CHECK RESPONSE STATUS HERE BEFORE CONTINUING!!!!!

      // part diagrams will be stored inpendently of a platform
      // if part is an object we will want to save that separately
      ctx.body = await response.json();
      ctx.status = 200;
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  });

  router.put('/api/platform/:id/part/:partId', async (ctx, next) => {
    try {
      await next();
      if (!ctx.params.id) {
        ctx.status = 400;
        ctx.status = missingIdError;
        return;
      }
      const response = await fetch(`${process.env.API_SRV_URL}/api/platforms/${ctx.params.id}/parts/${ctx.params.partId}`, {
        method: 'put',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ctx.request.body)
      });

      ctx.body = await response.json();
      ctx.status = 200;
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  });

  router.get('/api/platform/:id', async (ctx, next) => {
    try {
      await next();
      if (!ctx.params.id) {
        ctx.status = 400;
        ctx.status = missingIdError;
        return;
      }
      const response = await fetch(`${process.env.API_SRV_URL}/api/platforms/${ctx.params.id}`);
      ctx.body = await response.json();
      ctx.status = 200;
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  });

  // when we post a part it will not be active, until the platform is active
  router.post('/api/platform/:id/part', async (ctx, next) => {
    try {
      await next();
      const response = await fetch(`${process.env.API_SRV_URL}/api/platforms/${ctx.params.id}/part`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ctx.request.body)
      });
      ctx.body = await response.json();
      ctx.status = 200;
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  });

  router.post('/api/platform/:id/group', async (ctx, next) => {
    try {
      await next();
      const response = await fetch(`${process.env.API_SRV_URL}/api/platforms/${ctx.params.id}/group`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ctx.request.body)
      });
      ctx.body = await response.json();
      ctx.status = 200;
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  });

  router.put('/api/platform/:id/group/:groupId', async (ctx, next) => {
    try {
      await next();
      const response = await fetch(`${process.env.API_SRV_URL}/api/platforms/${ctx.params.id}/group/${ctx.params.groupId}`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ctx.request.body)
      });
      ctx.body = await response.json();
      ctx.status = 200;
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  });


  router.del('/api/platform/:id', async (ctx, next) => {
    try {
      await next();
      if (!ctx.params.id) {
        ctx.status = 400;
        ctx.status = missingIdError;
        return;
      }
      await fetch(`${process.env.API_SRV_URL}/api/platforms/${ctx.params.id}`, {
        method: 'delete'
      });
      ctx.status = 200;
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  });

  router.del('/api/platform/:id/part/:partId', async (ctx, next) => {
    try {
      await next();
      if (!ctx.params.id) {
        ctx.status = 400;
        ctx.status = missingIdError;
        return;
      }
      await fetch(`${process.env.API_SRV_URL}/api/platforms/${ctx.params.id}/part/${ctx.params.partId}`, {
        method: 'delete'
      });
      ctx.status = 200;
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  });

  router.post('/api/product', async (ctx, next) => {
    try {
      await next();
      ctx.body = Object.assign({}, {
        id: uuid.v4(),
        parts: []
      }, ctx.request.body);
      ctx.status = 200;
    } catch (err) {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  });

  return router.routes();
};
