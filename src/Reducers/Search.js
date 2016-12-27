/**
 * Application search reducer.
 * @module Reducers
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import { List } from 'immutable';
import { combineReducers } from 'redux';

import * as types from 'Constants/ActionTypes';

export const initialState = {
    loading: false,
    loans: []
}

export function loading(state = initialState.loading, action = {}) {
    switch (action.type) {
        case types.SET_SEARCH_STATUS:
            const { loadingState } = action.data;
            return loadingState;
            break;
        default:
            return state;
    }
}

export function loans(state = initialState.loans, action = {}) {
    switch (action.type) {
        case types.SEARCH_LOAN_SUCCESS:
            const { loans } = action.data;
            return List(loans);
            break;
        default:
            return List(state);

    }
}

export function getLoans(state: Object): List<string> {
    return state.search.loans;
}

export function getLoadingState(state: Object): boolean {
    return state.search.loading;
}

export default combineReducers({
    loans,
    loading
});
