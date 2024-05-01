const {hashPasswordUtlis} = require("../utli/HashPassword"); // Corrected import path
const User = require("../modals/user.modal");


const ResetPasswordController = async (req, res) => {
    const { collegeId, password } = req.body;
    
    if (!collegeId || !password) {
        return res.status(401).json({
            msg: 'Invalid details',
            statusCode: 401
        });
    }

    try {
        const userExists = await User.findOne({ collegeId: collegeId });
        
        if (!userExists) {
            return res.status(404).json({
                msg: 'User not found',
                statusCode: 404
            });
        }

        const newPasswordHash = await hashPasswordUtlis(req.body.password); // Hashing the new password
        
        await User.findOneAndUpdate({ collegeId: collegeId }, { password: newPasswordHash });
                   
        return res.status(200).json({
            msg: 'Password changed successfully',
            statusCode: 200
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Internal server error',
            statusCode: 500
        });
    }
};

module.exports = ResetPasswordController;
