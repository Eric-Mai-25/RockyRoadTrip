const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const City = mongoose.model('City');

router.get('/', async(req, res) => {
    const cities = await City.find();

    let newCitiesObj = {}
    cities.forEach((city) => {
        newCitiesObj[city._id] = city._doc
    })


    return res.json(newCitiesObj);
})

module.exports = router;