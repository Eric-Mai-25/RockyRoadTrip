const express = require('express');
const axios = require('axios');
const router = express.Router();

const YELP_API_KEY = process.env.YELP_API_KEY

router.get(`/searchYelp`, async (req, res) => {
    const { location, term, limit } = req.query;

    try {
        const response = await axios({
            method: "GET",
            url: `https://api.yelp.com/v3/businesses/search?location=${location}&term=${term}&limit=${limit}`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${YELP_API_KEY}`
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({error: 'Failed to fetch from Yelp'})
    }
});

module.exports = router;