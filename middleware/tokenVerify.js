const Vendor = require('../models/vendor')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleware = async (req, res, next) => {
    const token = req.headers.token
    if(!token){
        return res.status(401).json({error: 'Access Denied'})
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const vendor = await Vendor.findById(decoded.vendor_Id)
        if(!vendor){
            return res.status(401).json({error: 'Access Denied'})
        }
        req.vendor_Id = vendor._id
        next()
    }
    catch(err){
        return res.status(500).json({msg: 'Access Denied'})
    }
}

module.exports = authMiddleware