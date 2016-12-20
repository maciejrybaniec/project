/* @flow */
/**
 * Application actions.
 * @module Actions
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

 import * as types from 'Constants/ActionTypes';

 export const loginUser = (username: string, password: string): Object => {
     return {
         type: types.LOGIN_USER,
         data: {
             username,
             password
         }
     }
 };

 export const loginUserFailed = (): Object => {
     return {
         type: types.LOGIN_USER_FAILED
     }
 };

 export const loginUserSucess = (id: string, username: string): Object => {
     return {
         type: types.LOGIN_USER_SUCCESS,
         data: {
             user: {
                 id,
                 username
             }
         }
     }
 };
