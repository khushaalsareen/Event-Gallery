const nodemailer = require('nodemailer');
require('dotenv').config();
const sendNotification =async (emails) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: "anishchautala2000@gmail.com",
          pass: process.env.PASS,
        },
      });
    
      const receiver = {
        from: "anishchautala2000@gmail.com",
        to: emails,
        subject: "New Event Created",
        text: 'A new event has been listed. Please visit the website'
      };
      
      transporter.sendMail(receiver, (error, emailResponse)=>{
        if(error){
        console.log(error.message)
        throw error;
        }
      console.log("success");
      response.end();
      })
}

module.exports = sendNotification
