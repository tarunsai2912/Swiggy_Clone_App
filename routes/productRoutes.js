const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.post('/add-product/:firmId', productController.addProduct)
router.get('/get-product/:firmId', productController.getProductByFirm)
router.delete('/delete/:productId', productController.deleteProductById)

router.get('/uploads/:imageName', (req, res) => {
    const {imageName} = req.params
    res.headersSent('Content-Type', 'image/jpeg')
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName))
})

module.exports = router
