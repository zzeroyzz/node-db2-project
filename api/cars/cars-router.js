const express = require("express")
const Cars = require('./cars-model.js')
const mw = require('../cars/cars-middleware.js')

const router = express.Router

router.get('/',mw.checkCarPayload, (req,res) =>{
    Cars.getAll()
    .then(cars =>{
        res.status(200).json(cars)
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({message:"error retrieving cars"})
    })
})

router.get('/:id',mw.checkCarId,(req,res) =>{
    res.status(200).json(req.cars)
})

router.post('/',mw.checkVinNumberUnique,mw.checkVinNumberValid,mw.checkCarPayload,(req,res) =>{
    Cars.create(req.body)
    .then(cars =>{
        res.status(201).json(cars)
    })
    .catch(err =>{
        res.status(500).json({ message: 'Error adding the user'})
    })
})
module.exports =router