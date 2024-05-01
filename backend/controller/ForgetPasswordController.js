const User = require("../modals/user.modal");
const OtpGeneration = require("../utli/OTPGeneration");
const SendOtp = require("../utli/SendOtp");

const ForgetPasswordController = async (req, res) => {
    const { collegeId } = req.body;
    const userExists = await User.exists({ collegeId })
    // const userExists = await User.exists({ email: req.body.email  })
    
    if (userExists != null) {

        const user=await User.findOne(userExists._id)
        const GeneratedOtp =  OtpGeneration()
        try {
            await User.updateOne({ collegeId: collegeId }, { otp: GeneratedOtp })

            SendOtp(user.email, GeneratedOtp)
            // If otp has been send to user
            

                res.status(200).json({
                    msg: 'Hmm! OTP Send Successfully',
                    statusCode: 200
                })
            

        } catch (error) {
            console.error("Otp not updated")
            console.log(error)
            res.status(500).json({
                msg: 'Shit! Due to some internal error Otp is not generated',
                statusCode: 500
            })
        }


    }
    else {
        res.status(404).json({
            msg: 'User not found',
            statusCode: 404
        })
    }
}
module.exports = ForgetPasswordController