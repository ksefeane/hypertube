import nodemailer from 'nodemailer'
import keys from '../config/keys'

const email = nodemailer.createTransport(keys.email)

export default email