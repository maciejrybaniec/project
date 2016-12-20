/**
 * Application Sagas.
 * @module Sagas
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import { put } from 'redux-saga/effects'
import { takeEvery, takeLatest, delay } from 'redux-saga';

import * as types from 'Constants/ActionTypes';

function *loginUser() {
    yield delay(1000);
    yield put({ type: 'INCREMENT' });
}

 /**
  * Root saga method.
  * @method rootSaga
  */
 export default function* rootSaga() {
     yield takeLatest('LOGIN_USER', loginUser);
 }
