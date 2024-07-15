const express = require('express')
const app = express()
const port = 5000
const connectToMongo = require("./db")
connectToMongo()
app.get('/', (req, res) => {
  res.send('Wrote express for first time in life')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
