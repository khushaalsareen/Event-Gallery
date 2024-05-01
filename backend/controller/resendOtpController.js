const userModal = require("../modals/user.modal");
const OtpGeneration = require("../utli/OTPGeneration");
const SendOtp = require("../utli/SendOtp");

const resendOtpController = async (req,res)=>{
    const {collegeId} = req.body;
    if(!collegeId) return res.status(401).json({
        success: false,
        message: "No ID provided",
    })
    try{
        const user = await userModal.findOne({collegeId});
        const otp = OtpGeneration();
        SendOtp(user.email,otp);
        await userModal.updateOne({ collegeId: collegeId }, { otp: otp}) // new otp updated in database
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'OTP resent successfully',
        })
    } catch(error){
        return res.status(400).json({
            success: false,
            message: 'Error in resending otp'
        })
    }
}

module.exports = resendOtpController