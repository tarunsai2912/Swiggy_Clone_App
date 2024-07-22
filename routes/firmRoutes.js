const express = require('express')
const firmController = require('../controllers/firmController')
const router = express.Router()
const authMiddleware = require('../middleware/tokenVerify')

router.post('/add-firm', authMiddleware, firmController.addFirm)
router.delete('/delete/:firmId', firmController.deleteFirmById)

router.get('/uploads/:imageName', (req, res) => {
    const {imageName} = req.params
    res.headersSent('Content-Type', 'image/jpeg')
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName))
})

module.exports = router