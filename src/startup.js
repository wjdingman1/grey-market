const http = require('http'),
    mongoose = require('./lib/mongoose'),
    express = require('./lib/express'),
    logger = require('./lib/winston');

module.exports = async () => {
    logger.info('Initializing Node.js server');

    return mongoose.connect().then(() => {
        try {
            logger.info('Database connected successfully, initializing express application');

            // Initialize express
            const app = express.init();

            // Create the HTTP server
            logger.info('Creating HTTP server');
            const server = http.createServer(app);

            return server;
        } catch (err) {
            logger.error('Express initialization failed');
            return Promise.reject(err);
        }
    });
};
