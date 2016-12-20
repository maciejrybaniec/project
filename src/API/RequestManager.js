/**
 * Application REST request manager.
 * @module API
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import esPromise from 'es6-promise';
import 'isomorphic-fetch';

type TransportConfig = {
    timeout?: number,
    headers?: Object,
    host?: string,
};

/* Apply polyfill for native browser fetch */
esPromise.polyfill();

const DEFAULT_TIMEOUT = 10000;
const METHODS = {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

class RequestManager {
    /**
     * Global request timeout.
     * @property {number} _timeout Request timeout.
     * @private
     */
    _timeout: number;
    /**
     * Request custom headers.
     * @property {Object} _headers Request custom headers.
     * @private
     */
    _headers: Object;
    /**
     * Request host reference.
     * @property {string} _host Host reference.
     * @private
     */
    _host: string;
    constructor(config: TransportConfig = {}) {
        this._headers = config.headers || {};
        this._timeout = config.timeout || DEFAULT_TIMEOUT;
        this._host = config.host || '';
    }
    /**
     * Make POST request to API.
     * @param {string} path Request URL
     * @param {Object} [body] Request body.
     * @param {Object} [options] Request options.
     * @returns {Promise}
     */
    post(path: string, body?: Object, options: Object = {}) {
        return this._send(METHODS.POST, path, body, options);
    }
    /**
     * Make GET request to API.
     * @param {string} path Request URL
     * @param {Object} [body] Request body.
     * @param {Object} [options] Request options.
     * @returns {Promise}
     */
    get(path: string, body? : Object, options: Object = {}) {
        return this._send(METHODS.GET, path, body, options);
    }
    /**
     * Make GET request to API.
     * @param {string} method Request method.
     * @param {string} path Request URL
     * @param {Object} [body] Request body.
     * @param {Object} [options] Request options.
     * @private
     * @returns {Promise}
     */
    _send(method: string, path: string, body?: Object = {}, options: Object = {}): Promise<*> {
        const _options = {
            headers: {
                'Content-type': 'application/json',
                ...this._headers,
                ...options.headers
            },
            method: method,
            body: JSON.stringify(body),
            mode: 'cors',
            credentials: 'include'
        };

        return fetch(this._createUrl(path), _options).then((response) => {
            if (response.status < 200 || response.status >= 300) {
                return Promise.reject();
            }

            return response.json();
            
        }).catch((error) => {
            throw error;
        });
    }
    /**
     * Create endpoint URL.
     * @param {string} path Path to resource.
     * @returns {string}
     * @private
     */
    _createUrl(path: string): string {
        let url = path.indexOf('/') === 0 ? path : `/${path}`;
        return `${this._host}${url}`;
    }
}

export default RequestManager;
