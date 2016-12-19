/**
 * Application entry point.
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import express from 'express';
import expressGraphQL from 'express-graphql';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';
import session from 'express-session';
import webpack from 'webpack';

import Router from 'Server/Router';
import { Schema } from 'Server/GraphQL/Schema';
import config from './config';

const PORT = process.env.PORT || 3008;
const isProduction = process.env.NODE_ENV === 'production';

/* MongoDB Connection */
mongoose.connect(config.mongodb);
mongoose.Promise = Promise;

const connection = mongoose.connection;

connection.on('error', () => {
    console.error('Databse connection error');
});

connection.once('open', () => {
    console.log('Database connection established');
});

/* Application */
const app = express();

const staticPath = isProduction ? path.join(__dirname, 'assets') :
    path.join(__dirname, 'dist', 'assets');

app.use(express.static(staticPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session({ secret: 'app_secret' }));
app.use('/', Router);

app.use('/graphql', expressGraphQL({
    pretty: true,
    schema: Schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.info(`Listen on port: ${PORT}`);
});
