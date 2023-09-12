const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handeling GET requests to /products'
    });
});

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handeling POST requests to /products'
    });
});

//get one course
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    if(id === "aled"){
        res.status(200).json({
            message: 'MDP confirmé'
        });
    }
    else{
        res.status(200).json({
            message: 'ID passé'
        });
    }
    
});

module.exports = router;