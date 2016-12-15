/* @flow */
/**
 * Application router.
 * @module Modules/Router
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import React from 'react';
import { Route } from 'react-router';

import Main from 'Modules/Main';
import ProvidersMain from 'Modules/Providers/ProvidersMain';

export default (
     <Route path="/" component={Main}>
         <Route path="page" component={ProvidersMain} />
     </Route>
);
