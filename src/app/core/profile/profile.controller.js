const service = require('./profile.service');

/**
 * @function create
 * @return Promise
 */
module.exports.create = (req, res, next) => {
    service.create(req)
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
};

/**
 * @function find
 * @return Call next middleware
 */
module.exports.find = (req, res, next) => {
    service.find(req)
        .then(() => next())
        .catch((err) => next(err));
};

/**
 * @function weather
 * @return Promise
 */
module.exports.weather = (req, res, next) => {
    service.weather(req, res, next)
        .then((result) => res.status(200).json(result))
        .catch((err) => next(err));
};
