/**
 * Application entry point.
 * @copyright (c) 2016-present maciej.rybaniec@gmail.com
 */

import express from 'express';
import expressGraphQL from 'express-graphql';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import session from 'express-session';
import webpack from 'webpack';

import passport from 'passport';
import { Strategy } from 'passport-local';

import Router from 'Server/Router';
import { serializeUser, deserializeUser, authenticate } from 'Server/Session/handlers';
import { Schema } from 'Server/GraphQL/Schema';
import config from './config';

const PORT = process.env.PORT || 3008;
const isProduction = process.env.NODE_ENV === 'production';


/* Application */
const app = express();

const staticPath = isProduction ? path.join(__dirname, 'assets') :
    path.join(__dirname, 'dist', 'assets');

/**
 * Connect with mongo database.
 * @method connectWithMongo
 */
function connectWithMongo() {
    mongoose.connect(config.mongodb);
    mongoose.Promise = Promise;
    const connection = mongoose.connection;

    connection.on('error', () => {
        console.error('Databse connection error');
    });

    connection.once('open', () => {
        console.log('Database connection established');
    });
}

/**
 * Configure application middleware.
 * @method configureMiddleware
 */
function configureMiddleware() {
    app.use(express.static(staticPath));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(session({
        secret: 'app_secret',
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: false
    }));
}

/**
 * Configure passport middleware.
 * @method configurePassport
 */
function configurePassport() {
    passport.use(new Strategy({ session: true }, authenticate));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.use(passport.initialize());
    app.use(passport.session());
}

/**
 * Configure graphql endpoint.
 * @method configureGraphql
 */
function configureGraphql() {
    app.use('/graphql', expressGraphQL({
        pretty: true,
        schema: Schema,
        graphiql: true
    }));
}

configureMiddleware();
connectWithMongo();
configurePassport();
configureGraphql();

app.use('/', Router);
app.listen(PORT, () => {
    console.info(`Listen on port: ${PORT}`);
});
