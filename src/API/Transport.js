/**
 * Application REST Transport.
 * @module API
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import RequestManager from 'API/RequestManager';

import config from '../../config';

let _transport = new RequestManager({
    host: config.apiURL
});


export const getTransport = () => {
    return _transport;
};
