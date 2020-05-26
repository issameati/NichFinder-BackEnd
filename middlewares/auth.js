const User = require('../models/User')
const jwt = require('jsonwebtoken')
const ErrorResponse = require('../utils/ErrorResponse')
const asyncHandler = require('../middlewares/asyncHandler')

exports.protect =asyncHandler( async (req,res,next) =>{

    let token =null
    
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
      token = req.headers.authorization.split(' ')[1];
    if(!token)
      return next(new ErrorResponse(401,'login first!')) 

    try {
        const payload =  jwt.verify(token,process.env.JWT_SECRET_KEY);

        const user = await User.findById(payload.userId);
       
        req.user = user;
        next();
    } catch (err) {
        return next(new ErrorResponse(401,`login first`) )

    }

})