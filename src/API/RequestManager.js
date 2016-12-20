/**
 * Application REST request manager.
 * @module Reducers
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import esPromise from 'es6-promise';
import isomorphicFetch from 'isomorphic-fetch';

/* Apply polyfill for native browser fetch */
esPromise.polyfill();
