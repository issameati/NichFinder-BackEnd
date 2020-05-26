const express = require('express')
const {
    registerUser,
    loginUser,
    getMe,
    updateMe,
    imageUpload
} = require('../controllers/auth')
const {
    protect
} = require('../middlewares/auth')
const Router = express.Router();

Router.route('/register')
    .post(registerUser)
    .get(loginUser)

    
Router.route('/login')
    .post(loginUser)

Router.route('/me')
    .get(protect,getMe)

Router.route('/updateMe')
    .post(protect,updateMe)

Router.route('/upload')
    .post(protect,imageUpload)

module.exports = Router;