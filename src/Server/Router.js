/**
 * Server router.
 * @module Server/Router
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import React from 'react';
import ReactServerDOM from 'react-dom/server';
import authorization from 'connect-ensure-login';
import passport from 'passport';
import express from 'express';

import PageRender from 'Server/PageRender';

import {
    createUserRoute,
    renderLoginRoute,
    renderIndexRoute,
    loginUserRoute
} from 'Server/Session/routes';

import Main from 'Modules/Main';
import { ApolloProvider } from 'react-apollo'
import Store from 'Store/createStore';
import ApolloClient from 'Apollo/Client';
import ProvidersMain from 'Modules/Providers/ProvidersMain';

const Router = express.Router();

Router.get('/page', authorization.ensureLoggedIn(), (req, res) => {
    const html = ReactServerDOM.renderToString(
         <ApolloProvider client={ApolloClient} store={Store}>
        <Main>
          <ProvidersMain />
        </Main>
        </ApolloProvider>
    );

    res.status(200);
    res.send(PageRender(html));
});

/* Application Routes */
Router.get('/', renderIndexRoute);
Router.post('/signup', createUserRoute);
Router.get('/login', renderLoginRoute);

/* REST API */
Router.post('/api/login', passport.authenticate('local'), loginUserRoute);


export default Router;
