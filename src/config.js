const _ = require('lodash'),
    glob = require('glob'),
    chalk = require('chalk'),
    path = require('path');
const logger = require('./lib/winston');

/**
 * Ensure NODE_ENV exists
 */
function validateEnvironment() {
    if (process.env.NODE_ENV == null) {
        process.env.NODE_ENV = 'default';

        console.log('NODE_ENV is not set, using default environment');
    } else {
        console.log(`NODE_ENV is set to "${process.env.NODE_ENV}"`);
    }

    const envFiles = glob.sync(`config/env/${process.env.NODE_ENV}.js`);

    if (!envFiles.length) {
        console.log(
            chalk.red(
                `No configuration files found matching environment: "${process.env.NODE_ENV}"`,
            ),
        );
    }
}

/**
 * Initialize global config files
 */
function initGlobalFiles(config, assets) {
    config.files = {};

    config.files.models = glob.sync(assets.models);

    config.files.routes = glob.sync(assets.routes);

    config.files.tests = glob.sync(assets.tests);
}

function initConfig() {
    validateEnvironment();

    // Load default configuration
    const defaultConfig = require(path.join(process.cwd(), 'config/env/default'));

    // Load environment specific configuration
    const environmentConfig = require(path.join(process.cwd(), 'config/env/', process.env.NODE_ENV)) || {};

    // Merge the two config objects
    const config = _.extend(defaultConfig, environmentConfig);

    // Grab the assets from the application
    const assets = require(path.join(process.cwd(), 'config/assets'));

    initGlobalFiles(config, assets);

    return config;
}

module.exports = initConfig();
