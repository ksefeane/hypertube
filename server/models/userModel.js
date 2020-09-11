import q from './query'
import { hash, compare } from 'bcrypt'
import crypto from 'crypto'
import { validString, securePassword, validEmail } from './securityModel'
import { sendEmail } from './emailModel' 

const params = ['username', 'first_name', 'last_name', 'email', 'password']

export class User {
    constructor(user) {
        this.id = user.id ? user.id : null
        this.username = user.username ? user.username : ''
        this.first_name = user.first_name ? user.first_name : ''
        this.last_name = user.last_name ? user.last_name : ''
        this.email = user.email ? user.email : ''
        this.password = user.password ? user.password : ''
    }   
}
export async function signupUser(user) {
    var err = {"error": []}
    var uname = validString('username', user.username)
    var fname = validString('first_name', user.first_name)
    var lname = validString('last_name', user.last_name)
    var vpass = securePassword(user.password)
    var vemail = validEmail(user.email)
    var found = findUser(user.username, user.email)
    var valid = await Promise.all([uname, fname, lname, vpass, vemail, found])
    for await (const v of valid) {
        if (Object.keys(v)[0] === 'error')
            err.error.push(v.error)
    }
    return (err.error.length > 0 ? err : await insertUser(user) ?
        {'success': 'signup successful'} : {'error': 'server offline'})
}
async function findUser(username, email) {
    var fuser = q.fetchone('users', 'username', 'username', username)
    var femail = q.fetchone('users', 'email', 'email', email)
    var found = await Promise.all([fuser, femail])
    return (found[0] ? {'error': 'username is unavailable'} : 
        found[1] ? {'error': 'email is unavailable'} : 
        {'success': 'username & email available'})
}
export async function insertUser(user) {
    var newpass = await hash(user.password, 10)
    var vals = [user.username, user.first_name, user.last_name, user.email, newpass]
    return (await q.insert('users', params, vals))
}
export async function fetchUsers() {
    var f = await q.getall('users')
    return (f)
}
export async function signinUser(user) {
    let pro = await q.fetchone('users', ['username', 'password'], 'username', user.username)
    let pass = pro ? await compare(user.password, pro[0].password) : 0
    let token = await createToken(user.username)
    return (pass ? {'success': {'username': pro[0].username, 'token': token}} : {'error': 'username or password incorrect'})
}
export async function findOrCreate(profile) {
    var user = await q.fetchone('users', ['id', 'username', 'email'], 'username', profile.login)
    if (!user) {
        var newuser = new User(profile)
        newuser.username = profile.login
        newuser.password = await hash(Math.random.toString(36).substring(8), 10)
        var id = await insertUser(newuser)
        newuser.id = id.insertId
        return (newuser)
    }
    return (new User(user[0]))
}
export async function fetchUser(uid) {
    var user = await q.fetchone('users', ['id', 'username'], 'id', uid)
    return (user[0])
}
export async function uploadImage(user) {
    console.log(user)
    return ('soon')
}
export async function sendEmailLink(username) {
    // var token = await hash(Math.random.toString(36).substring(8), 10)
    var token = crypto.randomBytes(20).toString('hex')
    var email = await q.fetchone('users', ['email'], 'username', username)
    var link = `<p>Hello ${username}</p><br>
        <a href='http://localhost:8080/reset/${token}' target='_blank>click here to reset password</a>`
    var stat = email ? await sendEmail({from: 'hypertube@hypertube.com', to: email[0].email, 
        subject: 'reset password', text: link}) : {'error': 'email not found'}
    email ? q.insert('tokens', ['username', 'token', 'type'], [username, token, 'resetpassword']) : 0
    return (stat)
}
export async function checkEmailLink(token) {
    var user = await q.fetchone('tokens', ['username'], 'token', token)
    //destroy token in db
    return (user ? user : null)
}
export async function setPassword(token, password) {
    var vpass = await securePassword(password)
    if (Object.keys(vpass)[0] === 'error')
        return (vpass)
    var newpass = hash(password, 10)
    var user = checkEmailLink(token)
    var change = await Promise.all([newpass, user])
    q.update('users', ['password'], change[0], 'username', change[1][0].username)
    return (user ? {'success': 'password changed successfully'} : {'error': 'password change failed'})
}

export async function fetchDetails(username) {
    var data = await q.fetchone('users', ['first_name', 'last_name', 'email', 'username'], 'username', username)
    return data 
}

export async function updateUsername(username, email) {
    var data = await q.update('users', ['username'], [username],'email', email)
    return data
}

export async function updateEmail(username, email) {
    var data = await q.update('users', ['email'], [email],'username', username)
    return data
}

export async function updateLast(last_name, email) {
    var data = await q.update('users', ['last_name'], [last_name],'email', email)
    return data
}

export async function updateFirst(first_name, email) {
    var data = await q.update('users', ['first_name'], [first_name],'email', email)
    return data
}