/* @flow */
/**
 * Application actions.
 * @module Actions
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

 import * as types from 'Constants/ActionTypes';

 export const loginUser = (username: string, password: string) => {
     return {
         type: types.LOGIN_USER,
         data: {
             username,
             password
         }
     }
 };
