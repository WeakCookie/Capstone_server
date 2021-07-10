const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const dataRoutes = require('./routes/data')

app.use(cors())
app.use(express.json({limit: '50mb', extended: true}))

const { PORT } = process.env

app.get('/', async (_, res) => {
    res.send('liquid ass')
})

app.use('/data', dataRoutes)

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})