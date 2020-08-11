const express = require('express')
const path = require('path')

const app = express()

const port = 5000

app.listen(port, (err, res) => {
	console.log(`server listening on port ${port}...`)
})
