/* @flow */
/**
 * Session routes handlers.
 * @module Server/Session
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import React from 'react';
import ReactServerDOM from 'react-dom/server';
import { ApolloProvider } from 'react-apollo'

import Main from 'Modules/Main';
import Login from 'Modules/Authorization/Login';

import { createUserValidator } from 'Server/Session/validators';
import { createUser } from 'Server/Session/handlers';
import { UserModel } from 'Server/Models/User';
import PageRender from 'Server/PageRender';
import Store from 'Store/createStore';
import ApolloClient from 'Apollo/Client';

/**
 * Create application user.
 * @method createUser
 * @param {object} request HTTP request object
 * @param {object} response HTTP response object
 * @async
 */
export async function createUserRoute(request: Object, response: Object) {
    const errors = await createUserValidator(request.body);

    if (errors.length) {
        response.status(400);
        return response.json(errors);
    }

    const { username, email, password } = request.body;
    createUser(username, email, password);

    response.status(200);
    response.json({});
};

/**
 * Render login route.
 * @method renderLoginRoute
 * @param {object} request HTTP request object
 * @param {object} response HTTP response object
 * @async
 */
export function renderLoginRoute(request: Object, response: Object) {
    const html = ReactServerDOM.renderToString(
        <ApolloProvider client={ApolloClient} store={Store}>
            <Main>
                <Login />
            </Main>
        </ApolloProvider>
    );

    response.status(200);
    response.send(PageRender(html));
};

/**
 * Login user into application.
 * @method loginUserRoute
 * @param {object} request HTTP request object
 * @param {object} response HTTP response object
 * @async
 */
export async function loginUserRoute(request: Object, response: Object) {
    const { username } = request.body;
    const user = await UserModel.findOne({ username }, 'username');

    response.status(200);
    response.json(user);
};
