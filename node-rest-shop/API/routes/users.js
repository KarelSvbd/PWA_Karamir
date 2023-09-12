const express = require('express');
const router = express.Router();

//Display all users
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Not implemented route'
    });
});

//Adding a user
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Not implemented route'
    });
});


module.exports = router;