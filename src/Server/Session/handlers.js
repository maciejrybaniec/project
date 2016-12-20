/* @flow */
/**
 * Session handler.
 * @module Server/Session
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import bcrypt from 'bcrypt-nodejs';

import { UserModel } from 'Server/Models/User';

/**
 * Serialize user into session object.
 * @method serializeUser
 * @param {object} user User object.
 * @param {function} done Sucess callback.
 */
export function serializeUser(user: Object, done: Function) {
    done(null, user.id);
}

/**
 * Deserialize user based on session object.
 * @method deserializeUser
 * @param {string} id User identifier.
 * @param {function} done Sucess callback.
 */
export function deserializeUser(id: string, done: Function) {
    UserModel.findById(id, (error, user) => {
        if (error) return done(error);
        done(null, user);
    });
}

 /**
  * Create application user.
  * @method createUser
  * @param {string} username User login.
  * @param {string} email E-mail address.
  * @param {string} password User password.
  * @async
  */
export async function createUser(
    username: string,
    email: string,
    password: string
) {
    const salt = bcrypt.genSaltSync();
    const password_hash = bcrypt.hashSync(password, salt);

    const user = new UserModel({
        username,
        password: password_hash,
        email
    });

    return await user.save();
};

/**
 * Authorize user in application.
 * @method authenticate
 * @param {string} username User login.
 * @param {string} password User password.
 * @param {Function} done Callback function.
 */
export function authenticate(
    username: string,
    password: string,
    done: Function
) {
    UserModel.findOne({ username }, (error, user) => {
        if (error) return done(error);
        if (!user) return done(null, false);

        const syncPassword = bcrypt.compareSync(password, user.password);
        if (!syncPassword) return done(null, false);
        return done(null, user);
    });
};
