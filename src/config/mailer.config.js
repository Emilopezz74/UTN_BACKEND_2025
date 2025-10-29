import nodemailer from 'nodemailer'
import ENVIRONMENT from './environment.config.js'

const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth:{
        user: 'progruser23@gmail.com',
        pass: ENVIRONMENT.GMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    }
)
export default transporter