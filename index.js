require('dotenv').config()
const { socketConnection } = require('./utils/socket')
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const db = require('./models')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const app = express()
const http = require('http').createServer(app)
socketConnection(http)

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(fileUpload({}))
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('Hello, Express!')
})

const start = async () => {
  try {
    await db.sequelize.authenticate()
    await db.sequelize.sync()
    http.listen(port, () => console.log(`Server running on port ${port}`))
  } catch (e) {
    console.log(e)
  }
}

start()
