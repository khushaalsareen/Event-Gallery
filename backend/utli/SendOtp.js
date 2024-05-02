const nodemailer = require('nodemailer');
require('dotenv').config();
const SendOtp =async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "khushaalsareen@gmail.com",
          pass: process.env.PASS,
        },
      });
    
      const receiver = {
        from: "khushaalsareen@gmail.com",
        to: `${email}`,
        subject: "OTP",
        text: `This is your OTP for verification ${otp}`
      };
      
      transporter.sendMail(receiver, (error, emailResponse)=>{
        if(error)
        throw error,
      console.log("success");
      response.end();
      })
}

module.exports = SendOtp
