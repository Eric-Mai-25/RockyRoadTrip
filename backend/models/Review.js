const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
    
    {
        rating: {type: Number, required: true},
        comment: {type: String},
        author: {type: Schema.Types.ObjectId, ref: 'User'},
        itinerary: {type: Schema.Types.ObjectId, ref: 'Itinerary'}
    }
)

module.exports = mongoose.model('Review', reviewSchema);