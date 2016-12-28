/**
 * Application Sagas.
 * @module Sagas
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import { put, call } from 'redux-saga/effects';
import { takeEvery, takeLatest, delay } from 'redux-saga';

import * as types from 'Constants/ActionTypes';
import LoanSearch from '../Queries/loanSearch.graphql';

import SessionAPI from 'API/Handlers/SessionAPI';
import ApolloClient from 'Apollo/Client';

/**
 * Login user saga.
 * @method loginUser
 * @param {object} action Redux action object.
 * @async
 */
export function *loginUser(action) {
    try {
        const { username, password } = action.data;
        const user = yield call(SessionAPI.authorizeUser, username, password);
        yield put({ type: types.LOGIN_USER_SUCCESS, data: { user } });
    } catch (err) {
        yield put({ type: types.LOGIN_USER_FAILED });
    }
}

/**
 * Search loan based on provided params.
 * @method searchLoan
 * @param {object} action Redux action object.
 * @async
 */
export function *searchLoan(action) {
    try {
        const { days, value } = action.data;
        yield put({ type: types.SET_SEARCH_STATUS, data: { loadingState: true } });

        const searchResult = yield ApolloClient.query({
            query: LoanSearch,
            variables: {
                days,
                value
            }
        });

        const { searchLoans } = searchResult.data;
        const loansIdentifiers = searchLoans.map((loan) => {
            return loan.id;
        });

        yield put({ type: types.SET_SEARCH_STATUS, data: { loadingState: false } });
        yield put({ type: types.SEARCH_LOAN_SUCCESS, data: { loans: loansIdentifiers } });

    } catch (err) {
        yield put({ type: types.SEARCH_LOAN_FAILED });
    }
}

 /**
  * Root saga method.
  * @method rootSaga
  */
 export default function* rootSaga() {
     yield takeLatest(types.LOGIN_USER, loginUser);
     yield takeLatest(types.SEARCH_LOAN, searchLoan);
 }
