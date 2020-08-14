import q from './query'
const params = ['username', 'first_name', 'last_name', 'email', 'password']

export default class User {
    constructor(user) {
        this.username = user.username
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.email = user.email
        this.password = user.password
    }   
}
export async function insertUser(user) {
    var vals = [user.username, user.first_name, user.last_name, user.email, user.password]
    return (await q.insert('users', params, vals))
}
export async function fetchUsers() {
    var f = await q.getall('users')
    return (f)
}

