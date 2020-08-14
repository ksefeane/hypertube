import { fetchUsers, insertUser } from '../models/userModel'
import User from '../models/userModel'

export async function listUsers(req, res) {
    var f = await fetchUsers()
    res.send(f)
}

export async function registerUser(req, res, next) {
    var user = new User(req.body)
    var f = await insertUser(user)
    res.send(f)
}