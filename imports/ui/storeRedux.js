import React from 'react';
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducers from './reducers/reducers';

// export const store = createStore(
//     reducers,
//     {},
//     composeWithDevTools(applyMiddleware(promise(), thunk, logger))
// );

export const store = createStore(reducers,
    composeWithDevTools(applyMiddleware(promise(), thunk, logger))
);