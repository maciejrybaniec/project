/**
 * Application Sagas.
 * @module Sagas
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import { put, call } from 'redux-saga/effects';
import { takeEvery, takeLatest, delay } from 'redux-saga';

import * as types from 'Constants/ActionTypes';
import { authorizeUser } from 'API/Handlers/SessionAPI';

/**
 * Login user saga.
 * @method loginUser
 * @param {object} action Redux action object.
 * @async
 */
function *loginUser(action) {
    try {
        const { username, password } = action.data;
        const user = yield call(authorizeUser, username, password);
        yield put({ type: types.LOGIN_USER_SUCCESS, data: { user } });
    } catch (err) {
        yield put({ type: types.LOGIN_USER_FAILED });
    }
}

 /**
  * Root saga method.
  * @method rootSaga
  */
 export default function* rootSaga() {
     yield takeLatest(types.LOGIN_USER, loginUser);
 }
