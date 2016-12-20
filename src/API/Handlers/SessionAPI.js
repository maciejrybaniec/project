/**
 * Application session API.
 * @module API/Handlers
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import { getTransport } from 'API/Transport';

export function authorizeUser(username: string, password: string): Promise<*> {
    return getTransport().post('api/login', {
        username,
        password
    });
}

export default {
    authorizeUser
};
