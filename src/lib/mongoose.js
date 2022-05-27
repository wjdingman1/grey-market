const mongoose = require('mongoose'),
    path = require('path'),
    config = require('../config'),
    logger = require('./winston');

const { db } = config;
const connectionString = `mongodb://${db.username}:${db.password}@${db.host}:${db.port}/${db.name}`;

// Load the mongoose models
function loadModels() {
    // Globbing model files
    config.files.models.forEach((modelPath) => {
        logger.info(`Mongoose: Loading ${modelPath}`);
        require(path.posix.resolve(modelPath));
    });
}

module.exports.connect = async () => {
    try {
        await mongoose.connect(
            connectionString,
            db.options,
        );

        // Db connected successfully, now load all data models
        logger.info(`Mongoose: Connected to ${db.name} database`);
        logger.info('Loading mongoose data models...');
        loadModels();

        return Promise.resolve();
    } catch (err) {
        logger.error('Mongoose: Could not connect to database');
        return Promise.reject(err);
    }
};
