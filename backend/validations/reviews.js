const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateReviewInput = [
    check('rating')
    .exists()
    .isFloat({min: 0, max: 5})
    .withMessage('Rating must be a number between 0 and 5'),
    check('comment')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage('Comment must be a string'),
    handleValidationErrors
];

module.exports = validateReviewInput;