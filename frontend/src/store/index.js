import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {createLogger} from 'redux-logger';
import rootReducer from '../reducers';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['form'],
    // debug: true
};

const enhancedReducer = persistReducer(persistConfig, rootReducer);

function configureStore(initialState) {
    let createStoreWithMiddleware;

    // const persistor = persistStore(store);

    const logger = createLogger();
    const middleware = applyMiddleware(thunk, logger);

    createStoreWithMiddleware = compose(
        middleware
    );

    return createStoreWithMiddleware(createStore)(
        enhancedReducer,
        // rootReducer,
        initialState

    );
    // return createStoreWithMiddleware(createStore)(enhancedReducer, initialState);
}

// let store = configureStore(
//     /* redux devtool */
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

let store = configureStore(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
