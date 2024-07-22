const mongoose = require('mongoose')

const firmSchema = new mongoose.Schema({
    firmname: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    category: {
        type: [String],
        enum: ['veg', 'non-veg']
    },
    cuisine: {
        type: [String],
        enum: ['south-indian', 'north-indian', 'chinese', 'bakery']
    },
    offer: {
        type: String
    },
    image: {
        type: String
    },
    vendorId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vendor'
        }
    ],
    productId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

module.exports = mongoose.model('Firm', firmSchema)