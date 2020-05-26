const mongoose = require('mongoose');

const connectDB = async () => {

    try {
        const cnx = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        console.log(`MONGODB CONNECTED ON ${cnx.connection.port}`)
    } catch (error) {
        console.log(`MONGODB NOT CONNECTED : ${error}`)
    }

}

module.exports = connectDB;