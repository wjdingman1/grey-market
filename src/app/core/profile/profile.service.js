const axios = require('axios'),
    mongoose = require('mongoose'),
    config = require('../../../config'),
    logger = require('../../../lib/winston');

const Profile = mongoose.model('Profile');

module.exports.create = async (req) => {
    const data = req.body;

    const profile = new Profile({
        personaID: data.personaID,
        first: data.first,
        last: data.last,
        interests: data.interests,
        location: data.location,
    });

    try {
        await profile.save();
        return Promise.resolve(`Saved ${data.first} ${data.last} profile to database`);
    } catch (err) {
        logger.error(`Error attempting to save ${data.first} ${data.last} profile to database`);
        return Promise.reject(err);
    }
};

module.exports.find = async (req) => {
    const { id } = req.params;

    try {
        const profile = await Profile.findOne({ personaID: id }, { _id: 0, __v: 0 });

        // Append the profile to the request body for the next piece of middleware
        req.body.profile = profile;

        return Promise.resolve();
    } catch (err) {
        logger.error(`Error attempting to find personaID ${id} in database`);
        return Promise.reject(err);
    }
};

module.exports.weather = async (req, res, next) => {
    const { latitude, longitude } = req.body.profile.location;
    const { url, header } = config.weather;

    try {
        // Get info for the lat/long point
        const points = await axios({
            method: 'get',
            url: `${url}/points/${latitude},${longitude}`,
            headers: header,
        });

        // Get the location
        const forecastOffice = await axios({
            method: 'get',
            url: points.data.properties.forecastOffice,
            headers: header,
        });

        // Get the actual forecast
        const forecast = await axios({
            method: 'get',
            url: points.data.properties.forecastHourly,
            headers: header,
        });

        const { addressLocality: city, addressRegion: state } = forecastOffice.data.address;
        const { temperature } = forecast.data.properties.periods[0];

        // Append the forecast information to the current object
        req.body.temperature = temperature;
        req.body.city = city;
        req.body.state = state;

        return Promise.resolve(req.body);
    } catch (err) {
        // We had an error when querying the points
        // Still send a 200 but just modify the response
        logger.error(`Error when requestiong point data from ${url}`);

        const errString = `Invalid lat/long points (${latitude}, ${longitude})`;

        req.body.temperature = errString;
        req.body.city = errString;
        req.body.state = errString;

        return Promise.resolve(req.body);
    }
};
