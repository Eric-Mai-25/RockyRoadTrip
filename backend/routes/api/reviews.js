const express = require('express');
const router = express.Router();

/* GET reviews listing. */
router.get('/', function(req, res, next) {
    res.json({
        message: "GET /api/reviews"
    });
});

module.exports = router;
