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
    // <!> To change after defining database tables
    const user = {
        name: req.body.name
    }
    res.status(200).json({
        message: 'Not implemented route',
        createdUser: user
    });
});


module.exports = router;