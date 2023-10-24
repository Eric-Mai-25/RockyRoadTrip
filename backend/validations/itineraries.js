const { check } = require("express-validator");
const handleValidationErrors = require('./handleValidationErrors');

const validateItineraryInput = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 5})
        .withMessage('Itinerary name must be atleast 5 characters'),
    check('startCity')
        .exists({ checkFalsy: true }),
    check('endCity')
        .exists({checkFalsy: true}),
    check('middleCities')
        .optional()
        .isArray(),        
    handleValidationErrors
];

const validateItineraryPatchInput = [
    check('middleCities')
        .exists({checkFalsy: true}),
    handleValidationErrors        
]

module.exports = {
    validateItineraryInput: validateItineraryInput,
    validateItineraryPatchInput: validateItineraryPatchInput
};
