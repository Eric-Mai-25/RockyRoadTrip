const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const City = mongoose.model('City');

router.get('/', async(req, res) => {
    const cities = await City.find();
    return res.json(cities);
})

router.get('/:lng/:lat', async(req, res) => {
    const METERS_PER_MILE = 1609.34
    const cities = 
        await City.count({ 
            location: { 
                $nearSphere: { 
                    $geometry: { type: "Point", 
                                coordinates: [ req.params.lng, req.params.lat ] }, 
                    $maxDistance: 10000 * METERS_PER_MILE } } })
    return res.json(cities)
})

module.exports = router;