const express = require('express')
const router = express.Router()
const Vendor = require('../models/vendor')
const vendorController = require('../controllers/vendorController')

router.post('/register', vendorController.vendorRegister)
router.post('/login', vendorController.vendorLogin)
router.get('/all', vendorController.getAllVendors)
router.get('/each/:id', vendorController.getVendorById)

module.exports = router
