const express = require('express')
const app = express()
const port = 5000
const cors = require("cors");
const connectToMongo = require("./db")
connectToMongo()

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  })
);
app.get('/', (req, res) => {
  res.send('I will be a Microsoft Intern Soon')
})
app.use(express.json())
app.use('/api', require("./Routes/CreateUser"))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
 