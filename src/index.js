import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Routes from './Routes';
import reducers from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = process.env.NODE_ENV !== 'production'
  ? composeEnhancer(applyMiddleware(thunk))
  : applyMiddleware(thunk)

const store = createStore(reducers, middleware);

ReactDOM.render(
  <Provider store={store}>
    <Routes/>
  </Provider>,
  document.querySelector('#root')
);