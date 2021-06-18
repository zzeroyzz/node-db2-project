const express = require("express")
const Cars = require('./cars-model.js')
const mw = require('../cars/cars-middleware.js')

const router = express.Router()

router.get('/', (req,res) =>{
    Cars.getAll()
    .then(cars =>{
        res.status(200).json(cars)
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({message:"error retrieving cars"})
    })
})

router.get("/:id", mw.checkCarId, (req, res) => {
    res.json(req.car)
})

router.post("/", mw.checkCarPayload, mw.checkVinNumberUnique, mw.checkVinNumberValid, (req, res, next) => {
    const body = req.body
    Cars.create(body)
        .then(car => res.status(201).json(car))
        .catch(next)
})
router.use((err, req, res, next) => { 
    res.status(500).json({ message: err.message, stack: err.stack })
  })
module.exports = router