import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import proxy from 'express-http-proxy';
import { matchRoutes } from 'react-router-dom';
import App from '../App';
import { getServerStore } from '../store';
import routesConfig from '../routesConfig';

const express = require('express');

const app = express();
app.use(express.static('public'));
app.use(
  '/api',
  proxy('http://localhost:3333', {
    proxyReqPathResolver(req) {
      return `/api${req.url}`;
    },
  })
);

app.get('*', (req, res) => {
  const routeMatches = matchRoutes(routesConfig, {
    pathname: req.url,
  });
  // 匹配上了
  if (routeMatches) {
    const store = getServerStore();
    // 因为我们本次渲染可能会走多个数据加载，进行多次接口调用，可能有些成功了，有些失败了
    // 默认情况下，如果有一个接口失败了，整个应用加载就失败了，所以我们要不管成功还是失败都变成成功
    const loadDataPromises = routeMatches
      .map((match) => {
        return match.route.element.type.loadData?.(store).then(
          (data) => data,
          (error) => error
        );
      })
      .filter(Boolean);

    Promise.all(loadDataPromises).then(() => {
      const html = renderToString(
        <StaticRouter location={req.url}>
          <App store={store} />
        </StaticRouter>
      );

      res.send(`
      <!DOCTYPE html>
      <html lang="en">
          <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>ssr</title>
          </head>
          <body>
              <div id="root">${html}</div>
              <script>
                var context = { state: ${JSON.stringify(store.getState())} }
              </script>
              <script src="/client.js"></script>
          </body>
      </html>
      `);
    });
  } else {
    res.sendStatus(404);
  }
});

app.listen(3000, () => console.log(3000));
