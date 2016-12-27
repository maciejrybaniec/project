/**
 * Application session reducer.
 * @module Reducers
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import { combineReducers } from 'redux';

const initialState = {
    user: null
}

function user(state = initialState.user, action) {
    return state;
}

export default combineReducers({
    user
});
