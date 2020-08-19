import { User, fetchUsers, signupUser, signinUser } from '../models/userModel'
import passport from 'passport'
import axios from 'axios'

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

export function auth42(req, res, next) {
    //handle with passport
    res.redirect('/api/users')
}

export function info(req, res) {
    axios.get('https://api.intra.42.fr/v2/me')
    .then(res => {console.log(res.data)})
    .catch(err => {console.log(err)})
    res.send(res.data)
}

export function logoutUser(req, res) {
    //handle with passport
    res.send('logout')
}