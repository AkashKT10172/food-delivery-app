const mongoose = require('mongoose')
const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

const mongourl = process.env.MONGO_URL;

const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(mongourl, {
            useUnifiedTopology: true
        }) 
        console.log('Mongo connected')
        const fetched_data = await mongoose.connection.db.collection("foodData")
        const data = await fetched_data.find({}).toArray();
        const food_category = await mongoose.connection.db.collection("foodCategory")
        const foodData = await food_category.find({}).toArray();
        global.food_items = data;
        global.foodCategory = foodData;
    }
    catch(error) {
        console.log(error)
        process.exit()
    }
}
    module.exports = connectToMongo

