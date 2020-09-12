import { 
    User, fetchUsers, signupUser, signinUser, uploadImage, sendEmailLink, checkEmailLink, setPassword, signinOauth, oauthToken
} from '../models/userModel'
import { verify } from 'jsonwebtoken'

export function authRedirect(req, res, next) {
    if (req.isAuthenticated) {
        next()
    } else {
        return res.status(401).json({
            message: "not logged in"
        })
    }
}

export function jwtauth(req, res, next) {
    try {
        const token = req.headers.authorization.replace("Bearer ", "")
        const decode = verify(token, "secret")
        req.user = decode
       // console.log(decode)
        next()
    } catch (e) {
        return res.status(401).json({
            message: "authentication failed"
        })
    }
}

export async function listUsers(req, res) {
    var f = await fetchUsers()
    res.send(req.user)
}

export async function registerUser(req, res, next) {
    var user = new User(req.body)
    req.user = user.username
    var stat = await signupUser(user)
    res.send(stat)
}

export async function loginUser(req, res, next) {
    var user = new User(req.body)
    var stat = await signinUser(user)
    res.status(201).json(stat)
}
export async function authLogin(req, res, next) {
    let token = await oauthToken(req.user.username)
    res.header('token', token)
    res.redirect('http://localhost.localdomain:8080?t='+token)
}
export async function loginoauth(req, res, next) {
    try {
        var stat = await signinOauth(req.params.token)
        res.status(201).json(stat)
    } catch (e) {console.log(e)}
    
}
export function logoutUser(req, res) {
    req.logout()
    res.redirect('/api/users/auth/42')
}
export async function passwordReset(req, res) {
    var username = req.body.username
    var stat = await sendEmailLink(username).catch(e => {console.log(e)})
    res.send(stat)
}

export async function checkLink(req, res, next) {
    var stat = await checkEmailLink(req.params.reset)
    stat ? next() : res.send({'error': 'invalid token'})
}

export async function changePassword(req, res) {
    var stat = req.body.password.length > 0 ? 
    await setPassword(req.params.reset, req.body.password) : {'success': 'token valid, please enter password'}
    res.send(stat)
}

export async function uploadPhoto(req, res) {
    if (!req.file) {
        res.send('error please upload a valid picture')
        var stat = await uploadImage(req.user)
    } else {
        console.log('image uploaded')
        var stat = await uploadImage(req.user)
        res.send(stat)
    }
}