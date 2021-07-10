const express = require('express')
const router = express()

const dataController = require('../controllers/data')

router.post('/upload', dataController.uploadData)

module.exports = router