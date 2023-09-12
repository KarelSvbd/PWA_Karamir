const express = require('express');
const router = express.Router();

//get all categories
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Not implemented route'
    });
});

//Adding a category
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Not implemented route'
    });
});

//Changes a category
router.put('/', (req, res, next) => {
    res.status(200).json({
        message: 'Not implemented route'
    });
});

module.exports = router;