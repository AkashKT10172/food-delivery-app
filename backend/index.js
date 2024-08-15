const express = require('express')
const app = express()
const port = 5000
const cors = require("cors");
const connectToMongo = require("./db")
connectToMongo()

const allowedOrigins = ['http://localhost:3000/', 'https://biteblissfoods.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Allow request
    } else {
      callback(new Error('Not allowed by CORS')); // Reject request
    }
  },
  methods: 'GET,POST,PUT,DELETE', // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.options('*', cors(corsOptions))

app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.send('I will be a Microsoft Intern Soon')
})
app.use(express.json())
app.use('/api', require("./Routes/CreateUser"))
app.use('/api', require("./Routes/DisplayData"))
app.use('/api', require("./Routes/OrderData"))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
 