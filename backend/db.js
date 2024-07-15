const mongoose = require('mongoose')
const mongourl = 'mongodb+srv://Bite_Bliss:1234akash@cluster0.zscffay.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongourl) 
        console.log('Mongo connected')
    }
    catch(error) {
        console.log(error)
        process.exit()
    }
    }
    module.exports = connectToMongo

