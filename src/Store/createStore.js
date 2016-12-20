/* @flow */
/**
 * Create store instance.
 * @module Store
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import {
    applyMiddleware,
    createStore,
    combineReducers
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from 'Sagas/Saga';
import rootReducer from 'Reducers/rootReducer';
import ApolloClient from 'Apollo/Client';

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {
    const store = createStore(
        combineReducers({
            apollo: ApolloClient.reducer(),
            ...rootReducer
        }),
        applyMiddleware(
            sagaMiddleware,
            ApolloClient.middleware()
        )
    );

    sagaMiddleware.run(rootSaga);
    return store;
};

export default configureStore();
