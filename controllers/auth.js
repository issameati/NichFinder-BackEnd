const User = require('../models/User')
const bcrypt = require('bcryptjs')
const asyncHandler = require('../middlewares/asyncHandler')
const ErrorResponse = require('../utils/ErrorResponse')

//@DESC user Sign up
//@ROUTE api/v1/auth/register
//ACCESS PUBLIC
exports.registerUser = asyncHandler (async (req,res,next)=>{

        const user = await User.create(req.body)
        const token = user.getSignedJwtToken();
        res.status(200).json({
            success:true,
            users:{
                userId:user._id,
                token
            }
        })
})



//@DESC user Sign in 
//@ROUTE api/v1/auth/login
//ACCESS PUBLIC
exports.loginUser = asyncHandler(async (req,res,next)=>{

    const {email,password} = req.body;
    
        const user = await User.findOne({email}).select('password')
        if (!user) {
           return res.status(400).json({
                success:false,
                error:'invalid credentials'
            })
        }
       const isMatched = await bcrypt.compare(password,user.password);

       if (!isMatched) {
            return res.status(400).json({
                success:false,
                error:'invalid credentials'
            })
       }
      const token = user.getSignedJwtToken();
       res.status(200).json({
            success:true,
            user:{
               userId:user._id,
               token
            }
        })
}) 


//@DESC get my profile
//@ROUTE api/v1/auth/me
//ACCESS private
exports.getMe = asyncHandler(async (req,res,next)=>{
    const userId = req.user._id;
    const user = await User.findById(userId).select('-password')
    res.status(200).json({
        success:'true',
        user
    })
})


//@DESC get my profile
//@ROUTE api/v1/auth/updateMe
//ACCESS private
exports.updateMe = asyncHandler(async (req,res,next)=>{
    console.log(req.body)
    const userId = req.user._id;
    const Lastuser = await User.findByIdAndUpdate(userId, req.body ).select('-password')
    const newUser = await User.findById(userId).select('-password')
    res.status(200).json({
        success:'true',
        newUser
    })
})


//@DESC get my profile
//@ROUTE api/v1/auth/upload
//ACCESS private
exports.imageUpload = asyncHandler(async (req,res,next)=>{
    console.log(req.files.foo);

})











