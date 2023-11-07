const express = require('express');
const router = express.Router({mergeParams: true});
const mongoose = require('mongoose');
const {requireUser} = require('../../config/passport');
const validateReviewInput = require('../../validations/reviews');
const Review = mongoose.model('Review');

router.get('/', async function(req, res, next) {
    const reviews = await Review.find({itinerary: req.params.itineraryId})
    return res.json(reviews.reduce((resObj, ele) => ({...resObj, [ele._id]: ele._doc}), {}))
});

router.delete('/:id', requireUser, async (req, res, next) => {
    try{
        const review = await Review.find({_id: req.params.id, 
            itinerary: req.params.itineraryId, author: req.user._id})
        if(!review) {
            let error = new Error('Review not found');
            error.statusCode = 404;
            error.errors = { message: "Review not found or you dont have access to it" };
            return next(error);
        }
        await Review.deleteOne({_id: req.params.id})
        return res.json([]);
    } catch (err){
        return res.json(err)
    }
})

router.post('/', requireUser, validateReviewInput, async (req, res, next) => {  
    req.body.author = req.user._id
    req.body.itinerary = req.params.itineraryId
    const newReview = new Review(req.body)
    try{
        const review = await newReview.save();
        return res.json({review});
    } catch(err){
        return next(err);
    }
})

router.patch('/:id', requireUser, validateReviewInput, async (req, res, next) => {
    const review = await Review.find({_id: req.params.id, 
        itinerary: req.params.itineraryId, author: req.user._id})

    if(!review){
        const err = new Error("Review not found");
        err.statusCode = 404;
        const errors = {message: "Review not found or you dont have access to it"};
        err.errors = errors;
        return next(err);
    }
    let body = {
        rating: req.body.rating,
        comment: req.body.comment,
    }
    try {
        const reviewUpdated = await Review.updateOne({_id: req.params.id}, body)
        return res.json(reviewUpdated);
    } catch (err) {
        return next(err);
    }
})

module.exports = router;
