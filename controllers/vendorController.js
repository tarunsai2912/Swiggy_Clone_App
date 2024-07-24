const Vendor = require('../models/vendor')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const vendorRegister = async (req, res) => {
    try{
        const {username, email, password} = req.body
        const user = await Vendor.findOne({email})
        if(user){
            res.status(400).json({msg: "User Already Exists"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword
        })
        await newVendor.save()
        res.status(201).json(newVendor)
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }
}

const vendorLogin = async (req, res) => {
    try{
        const {email, password} = req.body
        const user = await Vendor.findOne({email})
        if(!user || !(await bcrypt.compare(password, user.password))){
            res.status(401).json({msg: 'Email/Password is Incorrect'})
        }
        const token = jwt.sign({vendor_Id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.status(200).json({msg: 'User got LoggedIn', token})
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }
}

const getAllVendors = async (req, res) => {
    try{
        const vendor = await Vendor.find().populate('firmId')
        res.status(200).json({vendor})
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }
}

const getVendorById = async (req, res) => {
    try{
        const {id} = req.params
        const newVendor = await Vendor.findById(id) 
        if(!newVendor){
            res.status(401).json({error: 'No Vendor Found'})
        }
        res.status(200).json(newVendor)
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }
}

module.exports = {vendorRegister, vendorLogin, getAllVendors, getVendorById}