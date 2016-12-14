import gulp from 'gulp';
import gulpLess from 'gulp-less';
import gutil from 'gulp-util';
import babel from 'gulp-babel';

import { graphql }  from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';

import nodemon from 'nodemon';
import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import { Schema } from './src/Server/GraphQL/Schema';

const autoprefixer = require('gulp-autoprefixer');
const LessPluginCleanCSS = require('less-plugin-clean-css');

/* Gulp plugins */
const cleancss = new LessPluginCleanCSS({
    'advanced': true
});

const enviroments = {
    PRODUCTION: 'production',
    DEVELOPMENT: 'development'
};

const schemaDirectories = {
    serverSchema: path.join(__dirname, 'src', 'Server', 'GraphQL/schema.json'),
    userSchema: path.join(__dirname, 'src', 'Server', 'GraphQL//schema.graphql')
};

/**
 * Update GraphQL schema.
 * @method updateSchema
 */
const updateSchema = async() => {
    const result = await graphql(Schema, introspectionQuery);
    if (result.errors) {
        console.error(JSON.stringify(result.error));
        throw Error('Introspecting schema');
    } else {
        const { serverSchema, userSchema } = schemaDirectories;
        fs.writeFileSync(serverSchema, JSON.stringify(result, null, 2));
        fs.writeFileSync(userSchema, printSchema(Schema));
    }
}

/**
 * Set process variavbles.
 * @method setEnviroment
 * @param {string} enviroment Enviroment.
 */
const setEnviroment = (enviroment) => {
    process.env.BABEL_ENV = enviroment;
    process.env.NODE_ENV = enviroment;
};

/**
 * Set production enviroment.
 */
gulp.task('enviroment:production', (done) => {
    setEnviroment(enviroments.PRODUCTION);
    gutil.log(`${gutil.colors.yellow('Enviroment')} - ${gutil.colors.green('PRODUCTION')}`);
    done();
});

/**
 * Update GraphQL schema.
 */
gulp.task('update:schema', (done) => {
    updateSchema();
    done();
});

/**
 * Build bundle for back-end server.
 */
gulp.task('build:back-end', (done) => {
    const webpackServerConfig = require('./webpack.server');
    webpack(webpackServerConfig(), (error, status) => {
        delete process.env.BABEL_ENV;
        if (error) {
            throw new gutil.PluginError('[build-back:end]', error);
        } else {
            gutil.log(`${gutil.colors.yellow('[build-back:end]')} - ${gutil.colors.green('READY')}`);
            done();
        }
    });
});

/**
 * Compile stylesheet files.
 */
gulp.task('compile:less', (done) => {
  gulp.src(path.join(__dirname, 'src', 'Styles/style.less'))
    .pipe(gulpLess({
       plugins: [cleancss]
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(path.join(__dirname, 'dist', 'assets', 'css')));
    done();
});

/**
 * Watch changes in back-end server files.
 */
gulp.task('watch:back-end', (done) => {
    const webpackServerConfig = require('./webpack.server');
    webpack(webpackServerConfig()).watch(100, (error, stats) => {
        if (error) {
            throw new gutil.PluginError('[watch-back:end]', error);
        } else {
            gutil.log(`${gutil.colors.yellow('[watch-back:end]')} - ${gutil.colors.green('COMPILED')}`);
        }
        nodemon.restart();
        done();
    });
});

/**
 * Run watch for stylesheet files.
 */
gulp.task('watch:styles', (done) => {
  gulp.watch(['./src/Styles/**/*.less'], gulp.series('compile:less'));
  done();
});

/**
 * Run back-end development server.
 */
gulp.task('development:back-end', gulp.series('watch:styles', 'watch:back-end', () => {
    nodemon({
        execMap: {
            js: 'node'
        },
        script: path.join(__dirname, 'dist/app.js'),
        ignore: ['*'],
        ext: 'noop'
    }).on('restart', () => {
        gutil.log(`${gutil.colors.yellow('[development:back-end]')} - ${gutil.colors.magenta('RESTARTED')}`);
    });
}));

/**
 * Build production bundle for back-end server.
 */
gulp.task('production:back-end', gulp.series('enviroment:production', 'build:back-end', (done) => {
    done();
}));
