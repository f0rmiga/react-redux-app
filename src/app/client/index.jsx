import FarceActions from 'farce/lib/Actions';
import BrowserProtocol from 'farce/lib/BrowserProtocol';
import createHistoryEnhancer from 'farce/lib/createHistoryEnhancer';
import queryMiddleware from 'farce/lib/queryMiddleware';
import createConnectedRouter from 'found/lib/createConnectedRouter';
import createMatchEnhancer from 'found/lib/createMatchEnhancer';
import createRender from 'found/lib/createRender';
import foundReducer from 'found/lib/foundReducer';
import Matcher from 'found/lib/Matcher';
import resolver from 'found/lib/resolver';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, compose, createStore } from 'redux';
import logger from 'redux-logger';

import 'bulma/css/bulma.css';

import routeConfig from '../routeConfig.jsx';

import ErrorComponent from './components/Error.react.jsx';

const store = createStore(
  combineReducers({
    found: foundReducer,
  }),
  compose(
    createHistoryEnhancer({
      protocol: new BrowserProtocol(),
      middlewares: [
        queryMiddleware,
        logger,
      ],
    }),
    createMatchEnhancer(new Matcher(routeConfig))
  )
);

store.dispatch(FarceActions.init());

const ConnectedRouter = createConnectedRouter({
  render: createRender({
    renderError: ErrorComponent,
  }),
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter resolver={resolver} />
  </Provider>,
  document.getElementById('root'),
);
