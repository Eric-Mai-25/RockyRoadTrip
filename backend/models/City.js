const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointSchema = new Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

const citySchema = new Schema({
    name: { type: String, required: true },
    description: {type: String, required: true},
    location: {
        type: pointSchema,
        required: true,
        index: '2dsphere' // Create a special 2dsphere index on `City.location`
    }
});

module.exports = mongoose.model('City', citySchema);
