const path = require('path')

const StorageService = require('../services/storage')
const PubSubService = require('../services/pub-sub')

const { DATA_BUCKET_NAME, PREDICTION_SUB_NAME } = process.env
const TIME_OUT = 60
const staticPath = path.join(__dirname, '..', '/static')

module.exports = {
    uploadData: (req, res) => {
        const fileName = 'test.sh' // TODO: upload file to /static path and put file name from req here
        const destFileName = `data/${fileName}`
        const filePath = path.join(staticPath, fileName)
        try {
            StorageService.uploadFile(DATA_BUCKET_NAME, filePath, destFileName)
            PubSubService.listenForPullMessages(PREDICTION_SUB_NAME, TIME_OUT)
            res.send('File transfer successfully')
        } catch(error) {
            res.status(500).error(error)
        }
    }
}