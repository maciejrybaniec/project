/* @flow */
/**
 * User model.
 * @module Server/Models/User
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const UserModel = mongoose.model('User', userSchema);
