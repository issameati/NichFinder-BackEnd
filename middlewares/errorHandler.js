const ErrorResponse = require('../utils/ErrorResponse')

const errorHandler = (err,req,res,next) =>{

    let error ={
        ...err
    };
     error.message = err.message
     //Mongoose bad ObjectId
     if (error.name === 'CastError') {
        const message = `not found with id of ${err.value}`;
        error = new ErrorResponse(404, message);
    }
    //Mongoose duplicate Key
    if (error.code === 11000) {
        const message = `duplicate field value entred :${error.keyValue.name}`;
        error = new ErrorResponse(400, message);
    }
	
    //Mongoose Validator
    if (error.name === 'ValidationError') {
        const message = Object.values(error.errors).map(item => item.message);
        error = new ErrorResponse(400, message);
    }

  console.log(error)

    
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
}

module.exports = errorHandler