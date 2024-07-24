const Product = require('../models/product')
const express = require('express')
const Firm = require('../models/firm')
const multer = require('multer')
const firm = require('../models/firm')
const path = require('path')

// image storing
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})

const addProduct = async (req, res) => {
    try{
        const {productname, price, category, bestseller, description} = req.body
        const image  = req.file? req.file.filename : undefined 

        const firmId = req.params.firmId
        const firm = await Firm.findById(firmId)

        if(!firm){
            return res.status(404).json({error: 'No Firm Found'})
        }

        const product = new Product({
            productname, price, category, bestseller, description, image, firmId: firm._id
        })
        const newProduct = await product.save()

        firm.productId.push(newProduct)
        await firm.save()

        res.status(200).json(newProduct)
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }
}

const getProductByFirm = async (req, res) => {
    try{
        const FirmId = req.params.firmId
        const firm = await Firm.findById(FirmId)

        if(!firm){
            return res.status(401).json({error: 'Firm is Not Found'})
        }

        const restaurantName = firm.firmname
        const product = await Product.find({firmId: FirmId})
        if(!product){
            return res.status(401).json({error: 'Product is Not Found'})
        }
        res.status(200).json({restaurantName, product})
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }
}

const deleteProductById = async (req, res) => {
    try{
        const {productId} = req.params
        const deletedProduct = await Product.findByIdAndDelete(productId)
        if(!deletedProduct){
            return res.status(404).json({error: 'No Product Found'})
        }
        res.status(200).send('Product Deleted')
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }
}

module.exports = {addProduct: [upload.single('image'), addProduct], getProductByFirm, deleteProductById}