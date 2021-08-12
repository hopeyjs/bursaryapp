const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
exports.createTransport = async () => {
    await nodemailer.createTransport({
        host: 'mail.netwareitsolutions.com',
        port: 465,
        secure: true, // secure:true for port 465, secure:false for port 587
        auth: {
            user: process.env.MAIL_ID,
            pass: process.env.MAIL_PASSWORD
        }
    })
}