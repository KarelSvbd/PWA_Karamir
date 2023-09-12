const express = require('express');
const router = express.Router();

//Show courses list
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Not implemented route'
    });
});

//Create a course
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Not implemented route'
    });
});

//With id

//get one course
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    if(id === "test"){
        res.status(200).json({
            message: 'Not implemented route'
        });
    }
    else{
        res.status(200).json({
            message: 'Not implemented route'
        });
    }
    
});

//register to a course
router.post('/:id', (req, res, next) => {
    const id = req.params.id;
    if(id === "test"){
        res.status(200).json({
            message: 'Not implemented route',
            id: req.params.id
        });
    }
    else{
        res.status(200).json({
            message: 'Not implemented route'
        });
    }
    
});

//change a course mark
router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    if(id === "test"){
        res.status(200).json({
            message: 'Not implemented route'
        });
    }
    else{
        res.status(200).json({
            message: 'Not implemented route'
        });
    }
    
});

module.exports = router;