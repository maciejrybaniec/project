/**
 * Server router.
 * @module Server/Router
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import React from 'react';
import ReactServerDOM from 'react-dom/server';
import express from 'express';

import PageRender from 'Server/PageRender';
import Main from 'Modules/Main';

const Router = express.Router();

Router.get('/page', (req, res) => {
    const html = ReactServerDOM.renderToString(
        <Main />
    );

    res.status(200);
    res.send(PageRender(html));
});

export default Router;
