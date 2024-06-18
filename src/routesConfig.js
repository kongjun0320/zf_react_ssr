import React from 'react';
import Home from './routes/Home';
import Counter from './routes/Counter';

export default [
  {
    path: '/',
    index: true,
    element: <Home />,
  },
  {
    path: '/counter',
    element: <Counter />,
  },
];
