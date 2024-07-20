import React from 'react';
import { renderToString, renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import proxy from 'express-http-proxy';
import { matchRoutes } from 'react-router-dom';
import StyleContext from 'isomorphic-style-loader-react18/StyleContext';
import App from '../App';
import { getServerStore } from '../store';
import routesConfig from '../routesConfig';
import { Helmet } from 'react-helmet';
import Counter from '../routes/Counter';

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
  const html = renderToString(<Counter />);
  console.log('html >>> ', html);
  res.send(`
      <!DOCTYPE html>
      <html lang="en">
          <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body>
              <div id="root">${html}</div>
          </body>
      </html>
      `);

  // const routeMatches = matchRoutes(routesConfig, {
  //   pathname: req.url,
  // });
  // // 匹配上了
  // if (routeMatches) {
  //   const { store } = getServerStore(req);
  //   // 因为我们本次渲染可能会走多个数据加载，进行多次接口调用，可能有些成功了，有些失败了
  //   // 默认情况下，如果有一个接口失败了，整个应用加载就失败了，所以我们要不管成功还是失败都变成成功
  //   // const loadDataPromises = [];
  //   const loadDataPromises = routeMatches
  //     .map((match) => {
  //       return match.route.element.type.loadData?.(store).then(
  //         (data) => data,
  //         (error) => error
  //       );
  //     })
  //     .concat(App.loadData && App.loadData(store))
  //     .filter(Boolean);
  //   Promise.all(loadDataPromises).then(() => {
  //     if (req.url === '/profile' && !store.getState().auth.user) {
  //       return res.redirect('/login');
  //     } else if (routeMatches[routeMatches.length - 1].route.path === '*') {
  //       res.statusCode = 404;
  //     }
  //     const css = new Set();
  //     const insertCss = (...styles) => {
  //       styles.forEach((style) => {
  //         css.add(style._getCss());
  //       });
  //     };
  //     const helmet = Helmet.renderStatic();
  //     // const html = renderToString(
  //     //   <StaticRouter location={req.url}>
  //     //     <StyleContext.Provider value={{ insertCss }}>
  //     //       <App store={store} />
  //     //     </StyleContext.Provider>
  //     //   </StaticRouter>
  //     // );
  //     const { pipe } = renderToPipeableStream(
  //       <StaticRouter location={req.url}>
  //         <StyleContext.Provider value={{ insertCss }}>
  //           <App store={store} />
  //         </StyleContext.Provider>
  //       </StaticRouter>,
  //       {
  //         // bootstrapScripts: ['/client.js'],
  //         onShellReady() {
  //           res.statusCode = 200;
  //           res.setHeader('Content-Type', 'text/html;charset=utf8');
  //           let style = '';
  //           if (css.size > 0) {
  //             style = `\n<style>${[...css].join('')}</style>`;
  //           }
  //           res.write(` <!DOCTYPE html>
  //                           <html lang="en">
  //                               <head>
  //                                   <meta charset="UTF-8" />
  //                                   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //                                   ${helmet.title.toString()}
  //                                   ${helmet.meta.toString()}
  //                                   ${style}
  //                               </head>
  //                               <body>
  //                                   <div id="root">`);
  //           pipe(res);
  //           res.write(`</div>
  //                             <script>
  //                               var context = { state: ${JSON.stringify(
  //                                 store.getState()
  //                               )} }
  //                             </script>
  //                             <script src="/client.js"></script>
  //                             </body>
  //                           </html>
  //                   `);
  //         },
  //       }
  //     );
  //     // res.send(`
  //     // <!DOCTYPE html>
  //     // <html lang="en">
  //     //     <head>
  //     //         <meta charset="UTF-8" />
  //     //         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //     //         ${helmet.title.toString()}
  //     //         ${helmet.meta.toString()}
  //     //         ${style}
  //     //     </head>
  //     //     <body>
  //     //         <div id="root">${html}</div>
  //     //         <script>
  //     //           var context = { state: ${JSON.stringify(store.getState())} }
  //     //         </script>
  //     //         <script src="/client.js"></script>
  //     //     </body>
  //     // </html>
  //     // `);
  //   });
  // } else {
  //   res.sendStatus(404);
  // }
});

app.listen(3000, () => console.log(3000));
