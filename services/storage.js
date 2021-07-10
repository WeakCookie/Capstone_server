const { Storage } = require('@google-cloud/storage')
const storage = new Storage()

module.exports = {
    uploadFile: async (bucketName, filePath, destFileName) => {
        await storage.bucket(bucketName).upload(filePath, {
            destination: destFileName
        })
    }
}