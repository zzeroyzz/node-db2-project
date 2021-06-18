const Cars = require('./cars-model')

exports.checkCarId = async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id)
    if(car){
      req.car = car
      next()
    }else{
      res.status(404).json({message: `car with id ${car} is not found `})
    }
  } catch (err) {
    next(err)
  }
}

exports.checkCarPayload = (req, res, next) => {
  try {
    if(!req.body.vin){
      res.status(400).json({message:'Vin number is required'})
    }
  } catch (err) {
    next(err)
  }
  
 
}

exports.checkVinNumberValid = (req, res, next) => {
  const vinValidator = require('vin-validator');
  const isValidVin = vinValidator.validate('11111111111111111');
  if(!isValidVin.validate(req.body.vin)){
    res.status(400).json({message: `invalid vin: ${req.body.vin}`})
  }
}


exports.checkVinNumberUnique = async (req, res, next) => {
  
    const currentVins = await Cars.getByVin()
    if(currentVins.some(vin => vin.name == req.body.name.trim() && vin.id != req.params.id )){
      return res.status(400).json({ message: `vin ${req.body.vin} already exists` })
    }
  next()
  
}
