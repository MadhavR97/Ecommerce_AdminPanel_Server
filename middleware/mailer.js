const nodemailer = require('nodemailer');

// Create a transporter
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'madhavrathod019@gmail.com',
        pass: 'itpa uyma pmqj hgov'
    }
})

// Send OTP
module.exports.sendOTP = (to, otp) => {
    const mailOptions = {
        from: 'madhavrathod019@gmail.com',
        to,
        subject: 'OTP Verification',
        text: `Your OTP is: ${otp}`
    }

    transport.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error)
        } else {
            console.log('Email sent')
        }
    })
}

