// const collegeStudentDataModal = require("../modals/colllegeData.model.js");
const userModal = require("../modals/user.modal.js");
const { hashPasswordUtlis } = require("../utli/HashPassword.js");
const OtpGeneration = require("../utli/OTPGeneration.js");
const SendOtp = require("../utli/SendOtp.js");

const CreateUserController = async (req, res) => {
    // const authenticatedUser = await collegeStudentDataModal.exists({ collegeId: req.body.collegeId })
    console.log(req.body.password)
    const newPasswordHash = await hashPasswordUtlis(req.body.password);
    
        const userExists = await userModal.exists({ collegeId: req.body.collegeId })
        console.log(userExists);
        if (userExists === null) {
           
           const newUser =  await userModal.create({
                name: req.body.name,
                collegeId: req.body.collegeId,
                password: newPasswordHash,
                email:req.body.email
            })

            console.log(newUser)

            const GeneratedOtp =  OtpGeneration()
        try {
            await userModal.findOneAndUpdate({ collegeId: req.body.collegeId }, { otp: GeneratedOtp })

            SendOtp(newUser.email, GeneratedOtp)
            // If otp has been send to user
            

        } catch (error) {
            console.error("Otp not updated")
            console.log(error)
            res.status(500).json({
                msg: 'Shit! Due to some internal error Otp is not generated',
                statusCode: 500
            })
        }

            return res.json({
                'message': 'Account Created Successfully',
                'statusCode': 200
            })

        }
        else {
            res.json({
                'message': 'Account Already Exists',
                'statusCode': 400
            })
            return;
        }
    
}
module.exports = CreateUserController