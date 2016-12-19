/* @flow */
/**
 * Session validators.
 * @module Server/Session
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import { UserModel } from 'Server/Models/User';

/**
 * Validate create user attributes.
 * @method createUserValidator
 * @param {object} body Request body.
 * @returns {Promise} Collection of errors.
 * @async
 */
export async function createUserValidator(body: Object): Promise<*> {
    const { username, email, password } = body;
    const errors = [];

    if (!username || username.length === 0) {
        errors.push({
            name: 'username',
            message: 'e_username'
        });
    }

    const users = await UserModel.find({ email });

    if (users.length > 0) {
        errors.push({
            name: 'email',
            message: 'e_email_1'
        });
    }

    return errors;
}
