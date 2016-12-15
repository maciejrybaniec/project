/* @flow */
/**
 * Front-end client entry point.
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import { ApolloProvider } from 'react-apollo'
import React from 'react';
import { render } from 'react-dom';
import {
    Router,
    browserHistory
} from 'react-router';

import Store from 'Store/createStore';
import ApolloClient from 'Apollo/Client';

import routes from 'Modules/Router';

render((
  <ApolloProvider client={ApolloClient} store={Store}>
     <Router history={browserHistory}>
        {routes}
     </Router>
  </ApolloProvider>
), document.getElementById('root'));
