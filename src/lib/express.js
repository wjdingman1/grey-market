const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    path = require('path'),
    logger = require('./winston'),
    config = require('../config');

const baseApiPath = '/api';

/**
 * Initialize local variables
 *
 *  @param {express.Express} app
 */
function initLocal(app) {
    // Setup local variables in the express object that may be helpful later
    app.locals.titles = config.app.title;
    app.locals.name = config.app.name;
    app.locals.developmentMode = process.env.NODE_ENV;
}

/**
 * Initialize some accessory middleware
 *
 *  @param {express.Express} app
 */
function initMiddleware(app) {
    // Showing stack errors
    app.set('showStackError', true);

    // Optionally turn on express logging
    if (config.expressLogging) {
        app.use(morgan('dev'));
    }

    // Request body parsing middleware
    app.use(
        bodyParser.urlencoded({
            extended: true,
        }),
    );
    app.use(bodyParser.json());
}

/**
 * Initialize all of the application routes
 *
 *  @param {express.Express} app
 */
function initServerRoutes(app) {
    // Create a global router
    const router = express.Router();

    // Use all the routes for all the modules
    // Only one module though at the moment -> profile
    config.files.routes.forEach((routePath) => {
        router.use(require(path.posix.resolve(routePath)));
    });

    // Put everything behind /api
    app.use(baseApiPath, router);
}

/**
 * Initialize a primitive error handler
 *
 * @param {express.Express} app
 */
function initErrorRoutes(app) {
    app.use((err, req, res, next) => {
        const errorResponse = {
            status: err.status || 500,
            type: err.type || 'server-error',
            message: err.messasage || 'Error: Unknown error',
            stack: err.stack.split('\n')[0],
        };

        // Log the stack trace for debugging
        logger.error(err.stack);

        // Send the response
        res.status(errorResponse.status).json(errorResponse);
    });
}

/**
 * Initialize the Express application
 *
 * @returns {express.Express}
 */
module.exports.init = () => {
    logger.info('Initializing Express');

    const app = express();

    // Initialize local variables
    initLocal(app);

    // Initialize middleware
    initMiddleware(app);

    // Initialize module routes
    initServerRoutes(app);

    // Initialize error routes
    initErrorRoutes(app);

    return app;
};
