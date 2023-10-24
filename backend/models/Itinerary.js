const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itinerarySchema = new Schema(
    {
        name: {type: String, required: true},
        startCity: {
            type: Schema.Types.ObjectId,
            ref: 'City'
        },
        endCity: {
            type: Schema.Types.ObjectId,
            ref: 'City'
        },
        middleCities: [{
            city: {
                type: Schema.Types.ObjectId,
                ref: 'City'
            }, 
            activities: [{name: {type: String, required: true}}],
            hotels: [{name: {type: String, required: true}}],
            food: [{name: {type: String, required: true}}]
        }],
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }
)

module.exports = mongoose.model('Itinerary', itinerarySchema)