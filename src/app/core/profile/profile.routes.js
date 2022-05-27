const express = require('express'),
    { Validator } = require('express-json-validator-middleware'),
    profileSchema = require('./profile.schema'),
    controller = require('./profile.controller');

const { validate } = new Validator();

const router = express.Router();

router
    .route('/create')
    .post(
        validate({ body: profileSchema.create }),
        controller.create,
    );

router
    .route('/find/:id')
    .get(
        controller.find,
        controller.weather,
    );

module.exports = router;
