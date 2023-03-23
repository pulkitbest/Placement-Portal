import asyncHandler from 'express-async-handler'
import emailjs from '@emailjs/nodejs' 

const sendMail = asyncHandler(async (params) => {
    try {
        var templateParams = {
            email: params.to,
            OTP: params.OTP
        }

        emailjs
            .send(process.env.EMAIL_SERVICE_ID, process.env.EMAIL_TEMPLATE_ID, templateParams, {
                publicKey: process.env.EMAIL_PUBLIC_KEY,
                privateKey: process.env.EMAIL_PRIVATE_KEY
            })
            .then((res) => {
                console.log(res)  
            })
            .catch((err) => {
                console.log(err)
            })
    } catch (error) {
        console.log(error)
        return false
    }    
})

export default sendMail