import { compose, applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from "redux"

// import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

// currying
// const curryFunc = (a) => () => {
//     a;
// }

const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type){
        return next(action);
    }
    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());

    next(action);

    console.log('next state: ', store.getState());

}


//root-reducer (big reducer)

const middleWares = [loggerMiddleware];

const composedEnhancers= compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);

