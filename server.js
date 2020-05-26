const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db')
const errorHandler = require('./middlewares/errorHandler')
const morgan = require('morgan')
const fileupload = require('express-fileupload')
const cors = require('cors')


//Routes 
const auth = require('./routes/auth')

const app = express();

dotenv.config({
    path:'./config/config.env'
})
//DB CONNECT
connectDB();

//middleware Access-Control-Allow-Origin: *
app.use(cors());

//middleware json parser
app.use(express.json());

//middleware File upload 
app.use(fileupload())

//logger middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Mount Routers 
app.use('/api/v1/auth',auth);

//Error Hadling
app.use(errorHandler);

const PORT = process.env.PORT || 5000
const NODE_ENV = process.env.NODE_ENV 

const server = app.listen(PORT,console.log(`SERVER RUNNING IN ${NODE_ENV} MODE ON PORT ${PORT}`.yellow.underline))

//Handle unhandled promise rejections
process.on("unhandledRejection",(err,promise)=>{
    console.log(`ERROR : ${err}`)
    //Close the server & exit the process 
    server.close(()=>process.exit(1))
})