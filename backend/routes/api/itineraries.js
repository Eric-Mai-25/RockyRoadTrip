const express = require('express');
const router = express.Router();

/* GET itineraries listing. */
router.get('/', function(req, res, next) {
    res.json({
        message: "GET /api/itineraries"
    });
});

module.exports = router;
