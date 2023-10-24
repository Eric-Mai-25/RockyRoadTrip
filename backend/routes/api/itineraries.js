const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {requireUser} = require('../../config/passport');
const {validateItineraryInput, validateItineraryPatchInput} = require('../../validations/itineraries');
const City = mongoose.model('City');
const Itinerary = mongoose.model('Itinerary');

router.get('/', async function(req, res, next) {
    try{
        const itineraries = await Itinerary.find()
                                    .populate("author", "_id username")
                                    .sort({createdAt: -1});
        return res.json(itineraries);
    } catch(err){
        return res.json([]);
    }
});

router.post('/', requireUser, validateItineraryInput, async(req, res, next) => {
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};

    let itineraryExists = await Itinerary.count({name: req.body.name, author: req.user._id})
    if(itineraryExists){
        errors.name = "A itinerary with this name already exists";
    }

    if(req.body.startCity === req.body.endCity){
        errors.startCity = "startCity and endCity cannot be same";
    }

    let allCities = await City.find()
    let cities = {}

    allCities.forEach(city => {
        cities[city._id] = city
    });

    if (!cities[req.body.startCity]){
        errors.startCity = "unable to find startCity"
    }

    if (!cities[req.body.endCity]){
        errors.endCity = "unable to find endCity"
    }

    let middleCitiesErrors = []

    req.body.middleCities.forEach((mCity, idx) => {
        if(!mCity.city || !cities[mCity.city]){
            middleCitiesErrors[idx] = {"city": "Invalid city"};
            return
        }
        if(mCity.city === req.body.startCity || mCity.city === req.body.endCity){
            middleCitiesErrors[idx] = {"city": `city cannot be same as start or end city`};
            return
        }
    })

    if (Object.keys(errors).length || middleCitiesErrors.length){
        errors.middleCities = middleCitiesErrors
        err.errors = errors;
        return next(err)
    }

    req.body.author = req.user._id
    try {
        let itinerary = await new Itinerary(req.body).save();
        itinerary = await itinerary.populate('author', '_id username');
        return res.json(itinerary);
    } catch(err) {
        next(err);
    }
});


router.patch('/:id', requireUser, validateItineraryPatchInput, async (req, res, next) => {
    let itinerary;
    try {
        itinerary = await Itinerary.findById(req.params.id);
    } catch(err) {
        let error = new Error('Itinerary not found');
        error.statusCode = 404;
        error.errors = { message: "No itinerary found with that id" };
        return next(error);
    }


    if(Object.keys(req.body).filter(ele => ele !== "middleCities").length){
        let error = new Error('Unprocessable entity');
        error.statusCode = 400;
        error.errors = { message: "Allowed params are: middleCities" };
        return next(error);
    }

    console.log(req.user._id)
    console.log(itinerary.author)

    if(req.user._id.toString() !== itinerary.author.toString()){
        let error = new Error('Unauthorized');
        error.statusCode = 403;
        error.errors = { message: "Itinerary can be updated by authors only" };
        return next(error);
    }

    const allCities = await City.find();
    let cities = {}

    allCities.forEach(city => {
        cities[city._id] = city
    });

    let middleCitiesErrors = []
    req.body.middleCities.forEach((mCity, idx) => {
        if(!mCity.city || !cities[mCity.city]){
            middleCitiesErrors[idx] = {"city": "Invalid city"};
            return
        }
        if(mCity.city === req.body.startCity || mCity.city === req.body.endCity){
            middleCitiesErrors[idx] = {"city": `city cannot be same as start or end city`};
            return
        }
    })

    try{
        let updatedItinerary = await Itinerary.updateOne({_id: req.params.id}, 
            {middleCities: req.body.middleCities})
        return res.json(updatedItinerary);
    } catch(err){
        next(err)
    }
})

module.exports = router;
