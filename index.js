require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const db = require('./models')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const port = process.env.PORT || 5000

const app = express()
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
    app.listen(port, () => console.log(`Server running on port ${port}`))
  } catch (e) {
    console.log(e)
  }
}

start()
