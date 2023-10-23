const express = require('express');
const router = express.Router();

/* GET session listing. */
router.get('/', function(req, res, next) {
    res.json({
        message: "GET /api/session"
    });
});

module.exports = router;
