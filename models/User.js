const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'email is Required']
    },
    email:{
        type:String,
        required:[true,'email is Required'],
        match:[emailRegex,'Please add an email'],
        unique: true,

    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    resetPasswordToken:String,
    resetPasswordExpired:Date,
    createAt:{
        type:Date,
        default:Date.now
    }
})

UserSchema.methods.getSignedJwtToken = function (){
    return token = jwt.sign({userId:this._id},process.env.JWT_SECRET_KEY,{expiresIn:'30d'});
}

UserSchema.pre('save', async function (next){
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})


module.exports = mongoose.model('User',UserSchema); 