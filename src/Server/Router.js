/**
 * Server router.
 * @module Server/Router
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import React from 'react';
import ReactServerDOM from 'react-dom/server';
import Passport from 'passport';
import { Strategy } from 'passport-local';
import express from 'express';

import PageRender from 'Server/PageRender';
import { authenticate } from 'Server/Session/handlers';

import {
    createUserRoute,
    renderLoginRoute,
    loginUserRoute
} from 'Server/Session/routes';


import Main from 'Modules/Main';
import { ApolloProvider } from 'react-apollo'
import Store from 'Store/createStore';
import ApolloClient from 'Apollo/Client';
import ProvidersMain from 'Modules/Providers/ProvidersMain';

const Router = express.Router();

Passport.use(new Strategy({ session: true }, authenticate));
Passport.serializeUser((user, done) => { done(null, user); });
Passport.deserializeUser((user, done) => { done(null, user); });

Router.get('/page', (req, res) => {
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

Router.post('/signup', createUserRoute);

Router.get('/login', renderLoginRoute);
Router.post('/api/login', Passport.authenticate('local'), loginUserRoute);




export default Router;
