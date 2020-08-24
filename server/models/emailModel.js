import nodemailer from 'nodemailer'
import { email } from '../config/keys'

export async function sendEmail(info) {
    return (await nodemailer.createTransport(email).sendMail(info).catch(error => {return (error)}))
}