import Q from '../models/query'

export function listUsers(req, res) {
    Q.fetchall('users', (err, data) => {
        if (data)
            res.send(data)
    })
}

export function registerUser(req, res) {
    var par = ['username', 'first_name', 'last_name', 'email', 'password']
    var val = ['ksefeane', 'kori', 'sefea', 'mailz', 'sphiri']
    Q.insert('users', par, val, (err, data) => {
        if (err)
            res.send(err)
        else
            res.status(201).send(data)
    })
}