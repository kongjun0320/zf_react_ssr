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

  if (routeMatches) {
    const { store } = getServerStore(req);

    const loadDataPromises = routeMatches
      .map((match) => {
        return (
          match.route.element.type.loadData &&
          match.route.element.type.loadData(store).then(
            (data) => data,
            (error) => error
          )
        );
      })
      .concat(App.loadData?.(store))
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
                </head>
                <body>
                    <div id="root">${html}</div>
                    <script>
                       window.context = { state: ${JSON.stringify(
                         store.getState()
                       )} }
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
