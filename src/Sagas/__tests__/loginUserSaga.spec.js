/**
 * loginUser saga specification.
 * @module Sagas/__tests__/loginUserSaga
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import { call, put } from 'redux-saga/effects';
import deepEqual from 'deep-equal';

import { loginUser } from 'Sagas/Saga';
import {
    loginUser as loginUserActions,
    loginUserSucess,
    loginUserFailed
} from 'Actions/ActionCreators';
import * as types from 'Constants/ActionTypes';

jest.mock('API/Handlers/SessionAPI');
import SessionAPI from 'API/Handlers/SessionAPI';

describe('loginUser', () => {

    it('should call SessionAPI and dispatch LOGIN_USER_SUCCESS action', () => {
            const actionArgs = ['username', 'password'];
            const action = loginUserActions(...actionArgs);
            const generator = loginUser(action);
            let next = generator.next();

            let equality = deepEqual(
                next.value,
                call(SessionAPI.authorizeUser, ...actionArgs)
            );
            expect(equality).toBe(true);

            const authorizedUser = {
                id: 'userId',
                username: 'username'
            };

            next = generator.next(authorizedUser);
            equality = deepEqual(
                next.value,
                put(loginUserSucess(authorizedUser.id, authorizedUser.username))
            );
            expect(equality).toBe(true);
        });

    it('should dispatch LOGIN_USER_FAILED action', () => {
        const generator = loginUser();
        const next = generator.next();

        const equality = deepEqual(
            next.value,
            put(loginUserFailed())
        );

        expect(equality).toBe(true);
    });
});
