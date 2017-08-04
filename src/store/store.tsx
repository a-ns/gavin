import { createStore, applyMiddleware } from 'redux';

import { reducer } from '../reducers/root';



export const setupStore = (options) => {
    console.log(options)
    const { middlewares } = options
    const middleware = applyMiddleware(...middlewares);
    return createStore(reducer, middleware)
}
