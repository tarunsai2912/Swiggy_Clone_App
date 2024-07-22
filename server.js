const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const vendorRoutes = require('./routes/vendorRoutes')
const productRoutes = require('./routes/productRoutes')
const firmRoutes = require('./routes/firmRoutes')
const path = require('path')
dotenv.config()

const app = express()
const port = process.env.port

app.use(bodyParser.json())

app.use('/api/vendor', vendorRoutes)

app.use('/api/firm', firmRoutes)

app.use('/api/product', productRoutes)

app.use('/uploads', express.static('uploads'))

mongoose.connect(process.env.MONGO_URI)

mongoose.connection.on('connected', () => {
    console.log('MongoDb is connected...');
})

app.listen(port, () => {
    console.log(`Server is running on ${port} port number`);
})