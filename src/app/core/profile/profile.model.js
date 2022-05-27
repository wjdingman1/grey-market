const mongoose = require('mongoose'),
    { getterPlugin, parseDecimal } = require('../../common/mongoose/getter.plugin');

const ProfileSchema = new mongoose.Schema({
    personaID: { type: Number, unique: true },
    first: { type: String },
    last: { type: String },
    interests: [{ type: String }],
    location: {
        latitude: { type: mongoose.Types.Decimal128, get: parseDecimal },
        longitude: { type: mongoose.Types.Decimal128, get: parseDecimal },
    },
}, { versionKey: false });

ProfileSchema.plugin(getterPlugin);
ProfileSchema.index({ personaID: 1 });

mongoose.model('Profile', ProfileSchema, 'profile');
