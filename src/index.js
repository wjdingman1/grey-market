const logger = require('./lib/winston'),
    config = require('./config'),
    startup = require('./startup')();

startup.then((server) => {
    server.listen(config.port);
    logger.info(`${config.app.instanceName} server started on port ${config.port}`);
}).catch((error) => {
    logger.error(`${error} - Startup failed`);
});
