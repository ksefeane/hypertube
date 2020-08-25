import { User, fetchUsers, signupUser, signinUser, uploadImage, emailLink } from '../models/userModel'

export async function listUsers(req, res) {
    var f = await fetchUsers()
    res.send(f)
}

export async function registerUser(req, res, next) {
    var user = new User(req.body)
    var stat = await signupUser(user)
    res.send(stat)
}

export async function loginUser(req, res, next) {
    var user = new User(req.body)
    var stat = await signinUser(user)
    res.send(stat)
}

export function authLogin(req, res, next) {
    //handle with passport
    res.redirect('/api/users')
}


export function logoutUser(req, res) {
    //handle with passport
    res.send(req.user)
}

export async function passwordReset(req, res) {
    var address = req.body.email
    var stat = await emailLink(address)
    res.send(stat)
}

export async function uploadPhoto(req, res) {
    var file = req.file
    if (!file) {
        res.send('error please upload a valid picture')
        var stat = await uploadImage(req.user)
    } else {
        var stat = await uploadImage(req.user)
        res.send(stat)
    }
}