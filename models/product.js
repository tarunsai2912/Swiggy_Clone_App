const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: [String],
        enum: ['veg','non-veg']
    },
    image: {
        type: String
    },
    bestseller: {
        type: Boolean
    },
    description: {
        type: String
    },
    firmId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Firm'
        }
    ]
})

module.exports = mongoose.model('Product', productSchema)