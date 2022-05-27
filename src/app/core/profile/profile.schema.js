module.exports.create = {
    $schema: 'http://json-schema.org/draft-07/schema',
    $id: 'node-rest-server/src/app/core/feedback/create',
    type: 'object',
    title: 'Feedback Schema',
    description: 'Schema for feedback creation',
    required: ['personaID', 'first', 'last', 'interests', 'location'],
    properties: {
        personaID: {
            $id: '#/properties/personaid',
            type: 'integer',
            title: 'PersonaID',
            description: 'ID for the profile',
            default: '',
            examples: ['123'],
        },
        first: {
            $id: '#/properties/first',
            type: 'string',
            title: 'First',
            description: 'First name for the user profile',
            default: '',
            examples: ['John'],
        },
        last: {
            $id: '#/properties/last',
            type: 'string',
            title: 'Last',
            description: 'Last name for the user profile',
            default: '',
            examples: ['smith'],
        },
        interests: {
            $id: '#/properties/interests',
            type: 'array',
            title: 'Interests',
            items: { type: 'string' },
            description: 'Interests that the user has',
            default: '',
            examples: [['running', 'hiking', 'basketball']],
        },
        location: {
            $id: '#/properties/location',
            type: 'object',
            title: 'Location',
            properties: {
                latitude: {
                    type: 'number',
                    minimum: -90,
                    maximum: 90,
                },
                longitude: {
                    type: 'number',
                    minimum: -180,
                    maximum: 180,
                },
            },
            description: 'Latitude and Longitute for the user',
            default: '',
            examples: [['running', 'hiking', 'basketball']],

        },
    },
};
