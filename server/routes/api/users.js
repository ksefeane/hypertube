const express = require('express')
const router = express.Router()
const Q = require('../../models/query')
const userController = require('../../controllers/user')

//get
router.get('/', (req, res) => {
    Q.fetchall('users', (err, data) => {
        if (data)
            res.send(data)
    })
})

//add
router.post('/', userController.registerUser)

//delete

module.exports = router