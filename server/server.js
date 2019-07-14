/* eslint-disable import/extensions */
import express from 'express';
import LRUCache from 'lru-cache';
import fs from 'fs';
import nextjs from 'next';
import compression from 'compression';
import requestProxy from 'express-request-proxy';

import routes from './routes.js';


const port = parseInt(process.env.PORT, 10) || 8333;
const dev = process.env.NODE_ENV !== 'production';
const app = nextjs({ dev });
const handle = app.getRequestHandler();

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60, // 1hour
});

const getCacheKey = function getCacheKey(req) {
  return `${req.url}`;
};

const renderAndCache = function renderAndCache(
  req,
  res,
  pagePath,
  queryParams
) {
  const key = getCacheKey(req);

  if (ssrCache.has(key) && !dev) {
    console.log(`CACHE HIT: ${key}`);
    res.send(ssrCache.get(key));
    return;
  }
  app
    .renderToHTML(req, res, pagePath, queryParams)
    .then((html) => {
      if (!dev) {
        console.log(`CACHE MISS: ${key}`);
        ssrCache.set(key, html);
      }

      res.send(html);
    })
    .catch((err) => {
      app.renderError(err, req, res, pagePath, queryParams);
    });
};

const routerHandler = routes.getRequestHandler(
  app,
  ({
    req, res, route, query,
  }) => {
    renderAndCache(req, res, route.page, query);
  }
);

app.prepare()
  .then(() => {
    const server = express();

    if (!dev) {
      server.use(compression({ threshold: 0 }));
    }
    server.get(
      '/api/registry/:package',
      requestProxy({
        url: 'https://registry.npmjs.org/:package',
      })
    );
    server.get('/api/dependents/:package', (req, res, next) => {
      const proxy = requestProxy({
        url: 'https://skimdb.npmjs.com/registry/_design/app/_view/dependedUpon',
        query:
            {
              group_level: 3,
              startkey: `["${req.params.package}"]`,
              endkey: `["${req.params.package}", {}]`,
              skip: 0,
              limit: 10000,
            },
      });
      proxy(req, res, next);
    });
    server.get('/sw.js', (req, res) => {
      res.setHeader('content-type', 'text/javascript');
      fs.createReadStream('./public/serviceWorker.js').pipe(res);
    });

    server.get('/manifest.html', (req, res) => {
      res.setHeader('content-type', 'application/json');
      fs.createReadStream('./public/manifest.json').pipe(res);
    });
    server.use(routerHandler);

    server.get('*', (req, res) => handle(req, res));
    server.listen(port, (err) => {
      if (err) {
        return console.error(err.message);
      }
      return console.log(`app started on ${port}`);
    });
  });

