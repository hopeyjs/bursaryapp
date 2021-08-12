const nodemailer = require('nodemailer');

exports.sendMail = async (mail) => {
// create a transporter
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_SERVICE,
  port: 587,
  secure: false,
  tls: {
  rejectUnauthorized: false
    },
     auth: {
         user: process.env.MAIL_ID,
         pass: process.env.MAIL_PASSWORD,
   }
});

// send the email
  await transporter.sendMail(mail).then(mail => {
  console.log('mail sent')
  }).catch(err => {
    console.log('mail not sent', err)
    return res.status(501).render('mailverify', {
      status: 'failure',
      message: 'Your account has been created but an error has occured while sending the verification email, Please contact the admin to resolve this.'
    })
})
};