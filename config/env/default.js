module.exports = {

    // Basic title and instance name
    app: {
        title: 'Grey Market Labs Test',
        name: 'Grey Market Labs Test',
        instanceName: 'grey-market',
        url: {
            protocol: 'http',
            host: 'localhost',
            port: 3000,
        },
        clientUrl: 'http://localhost/',
        helpUrl: 'http://localhost/#/help',
        contactEmail: 'wjdingman1@gmail.com',
    },

    expressLogging: true,

    // MongoDB
    db: {
        name: 'greymarket',
        username: 'root',
        password: 'root',
        port: 27017,
        host: 'localhost',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },

    weather: {
        url: 'https://api.weather.gov',
        header: { 'User-Agent': 'wjdingman1@gmail.com', Accept: 'application/geo+json' },
    },

    // The port to serve the application on
    port: process.env.PORT || 3000,

};
