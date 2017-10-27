import React from 'react';

import App from './client/components/App.react.jsx';
import Foo from './client/components/Foo.react.jsx';

export default [
  {
    path: '/',
    Component: App,
    children: [
      {
        Component: () => <div>Main</div>,
      },
      {
        path: 'foo',
        Component: Foo,
      },
    ],
  },
];
