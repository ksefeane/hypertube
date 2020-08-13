const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 5000

//middleware
app.use(bodyParser.json())
app.use(cors())

//initialize database
const db = require('./models/db')
db.init()

const users = require('./routes/api/users')
app.use('/api/users', users)

app.listen(port, () => 
    console.log(`server listening on port ${port}...`))