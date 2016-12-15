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

import ApolloClient from 'Apollo/Client';

const configureStore = () => {
    return createStore(
        combineReducers({
            apollo: ApolloClient.reducer()
        }),
        applyMiddleware(
            ApolloClient.middleware()
        )
    );
};

export default configureStore();
