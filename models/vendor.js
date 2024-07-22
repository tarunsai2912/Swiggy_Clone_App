const mongoose = require('mongoose')

const vendorSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true    
    },
    password: {
        type: String,
        required: true
    },
    firmId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Firm'
        }
    ],
})
module.exports = mongoose.model('Vendor', vendorSchema)