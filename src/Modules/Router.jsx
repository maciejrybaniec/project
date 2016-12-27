/* @flow */
/**
 * Application router.
 * @module Modules/Router
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Main from 'Modules/Main';
import CompareRoot from 'Modules/Compare/CompareRoot';
import Login from 'Modules/Authorization/Login';

import ProvidersMain from 'Modules/Providers/ProvidersMain';

export default (
     <Route path="/" component={Main}>
         <IndexRoute component={CompareRoot} />
         <Route path="page" component={ProvidersMain} />
         <Route path="login" component={Login} />
     </Route>
);
