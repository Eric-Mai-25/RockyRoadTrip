const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, index: {unique: true} },
        hashedPassword: { type: String, required: true},
        itineraries: [{
            type: Schema.Types.ObjectId,
            ref: 'Itinerary'
        }]
    }, { 
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);
