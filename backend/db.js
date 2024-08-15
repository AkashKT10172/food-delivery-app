const mongoose = require('mongoose')
const mongourl = 'mongodb+srv://Bite_Bliss:1234akash@cluster0.zscffay.mongodb.net/Bite_Bliss?retryWrites=true&w=majority&appName=Cluster0'
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
        console.log(data)
    }
    catch(error) {
        console.log(error)
        process.exit()
    }
}
    module.exports = connectToMongo

