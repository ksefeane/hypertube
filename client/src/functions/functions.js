import axios from 'axios'


export function secure_password(password) {
    const messsage = 'Your password must contain at least '
    if (password.length < 8) {
        return ('The password is too short (must contain atleast 8 characters)')
    } else {
        if (password.search(/[0-9]/) < 0) {
            return (messsage + 'digit')
        } else if (password.search(/[A-Z]/) < 0) {
            return (messsage + 'uppercase character')
        } else if (password.search(/[a-z]/) < 0) {
            return (messsage + 'lowercase character')
        } else if (password.search(/[!@#$%^&*]/) < 0) {
            return (messsage + 'special character')
        } else {
            return ("good")
        }
    }
}

export async  function axios_post(url, data) {
    const path = 'http://localhost:5000' + url
    try {
        const result = await axios.post(path, data)
        return result
    } catch (error) {
        return "Oops!"
    }
}

export async function post_comment(url, data) {
    const path = 'http://localhost:5000' + url
    try {
        const result = await axios.post(path, data)
        return result
    } catch (error) {
        return "Error!";
    }
}