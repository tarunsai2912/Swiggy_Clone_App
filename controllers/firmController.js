const firm = require('../models/firm')
const Firm = require('../models/firm')
const Vendor = require('../models/vendor')
const multer = require('multer')
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

const addFirm = async (req, res) => {
    try{
        const {firmname, location, category, cuisine, offer} = req.body
        const image  = req.file? req.file.filename : undefined 

        const vendor = await Vendor.findById(req.vendor_Id)
        if(!vendor){
            res.status(401).json({message: 'Vendor Not Found'})
        }

        const firm = new Firm({
            firmname, location, category, cuisine, offer, image, vendorId: vendor._id
        })
        const newFirm = await firm.save()

        vendor.firmId.push(newFirm)
        await vendor.save()

        return res.status(200).json(firm)
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }
}

const deleteFirmById = async (req, res) => {
    try{
        const {firmId} = req.params
        const deletedFirm = await Firm.findByIdAndDelete(firmId)
        if(!deletedFirm){
            return res.status(404).json({error: 'Firm Not Found'})
        }
        res.status(200).send('Firm Deleted')
    }
    catch(err){
        res.status(500).json({msg: err.message})
    }
}

module.exports = {addFirm: [upload.single('image'), addFirm], deleteFirmById} 