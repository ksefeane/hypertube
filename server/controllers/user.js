const Q = require('../models/query')

exports.registerUser = (req, res) => {
    par = ['username', 'first_name', 'last_name', 'email', 'password']
    val = ['ksefeane', 'kori', 'sefea', 'mailz', 'sphiri']
    Q.insert('users', par, val, (err, data) => {
        if (err)
            res.send(err)
        else
            res.status(201).send(data)
    })
}