/**
 * Search reducer specification.
 * @module Reducers/__tests__/Search
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import deepEqual from 'deep-equal';
import { List } from 'immutable';

import * as types from 'Constants/ActionTypes';
import { setSearchLoadingState } from 'Actions/ActionCreators';
import {
    initialState,
    loading,
    loans
} from 'Reducers/Search';

describe('Search Reducer', () => {

    describe('Loading state', () => {
        it('should set default state', () => {
            const reducerValue = loading();
            expect(reducerValue).toBe(false);
        });

        it('should set state based on SET_SEARCH_STATUS action value', () => {
            const action = setSearchLoadingState(true);
            const reducerValue = loading(
                initialState.loading,
                action
            );

            expect(reducerValue).toBe(true);
        });
    });

    describe('Loans state', () => {
        it('should set default state', () => {
            const reducerValue = loans();

            expect(reducerValue instanceof List).toBe(true);
            expect(reducerValue.size).toEqual(0);
        });

        it('should set state based on SEARCH_LOAN_SUCCESS action value', () => {
            const loanIdentifiers = [1, 2, 3, 4];
            const action = {
                type: types.SEARCH_LOAN_SUCCESS,
                data: { loans: loanIdentifiers }
            }

            const reducerValue = loans(
                initialState.loans,
                action
            );

            expect(reducerValue instanceof List).toBe(true);
            expect(reducerValue.size).toEqual(loanIdentifiers.length);
        });
    });
});
