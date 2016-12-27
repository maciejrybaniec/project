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

 export const setSearchLoadingState = (loadingState: boolean) => {
     return {
        type: types.SET_SEARCH_STATUS,
        data: {
            loadingState
        }
     }
 };

 export const searchLoan = (value: number, days: number) => {
    return {
        type: types.SEARCH_LOAN,
        data: {
            value,
            days
        }
    }
 };
