const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 5000

//middleware
app.use(bodyParser.json())
app.use(cors())

//initialize database
const db = require('./model/dbModel')
db.init()

const posts = require('./routes/api/posts')
app.use('/api/posts', posts)

app.listen(port, () => 
    console.log(`server listening on port ${port}...`))