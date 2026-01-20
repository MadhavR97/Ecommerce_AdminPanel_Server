const userSchema = require('../model/userSchema')
const mailer = require('../middleware/mailer')

// Create Admin / User
module.exports.AddUser = async (req, res) => {
    try {
        const existUser = await userSchema.findOne({ email: req.body.email })

        if (existUser) {
            return res.status(500).json({ message: 'User already exist' })
        }
        else {
            const user = await userSchema.create(req.body)
            return res.status(200).json({ message: 'User Created Successfully', user })
        }
    }
    catch (error) {
        console.error("Error adding user:", error);
    }
}

// Edit User
module.exports.EditUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await userSchema.findById(id)

        if (user) {
            const updatedUser = await userSchema.findByIdAndUpdate(id, req.body, { new: true });
            res.status(200).json({ message: 'User updated successfully', updatedUser });
        }
    }
    catch (error) {
        console.error("Error editing user:", error);
    }
}

// Delete User
module.exports.DeleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userSchema.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Get Admin / User
module.exports.LoginUser = async (req, res) => {
    try {
        const existUser = await userSchema.findOne({ role: req.body.role, email: req.body.email })

        if (!existUser) {
            return res.status(500).json({ message: 'User not exist' })
        }
        else {
            if (existUser.password !== req.body.password) {
                return res.status(500).json({ message: 'Password not matched' })
            }
            else {
                return res.status(200).json({ message: 'Login Successfully', existUser })
            }
        }
    }
    catch (error) {
        console.log(error)
    }
}

// Get Admin / User
module.exports.GetUsers = async (req, res) => {
    try {
        const users = await userSchema.find({ role: 'user' });
        res.status(200).json({ users });
    }
    catch (error) {
        console.log(error);
    }
}

// Forgot Password
module.exports.ForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'This email is not registered' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);

        user.resetOtp = otp;
        user.resetOtpExpiry = new Date(Date.now() + 60 * 1000);

        await user.save();

        await mailer.sendOTP(email, otp);

        return res.status(200).json({
            success: true,
            message: 'OTP sent to your email'
        });

    } catch (error) {
        console.error("Error in ForgotPassword:", error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// OTP Varification
module.exports.verifyOTP = async (req, res) => {
    try {
        const { email, obj } = req.body;
        const userOtp = Object.values(obj).join('');
        const user = await userSchema.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.resetOtpExpiry < Date.now()) {
            return res.status(400).json({ message: 'OTP expired' });
        }

        if (user.resetOtp !== Number(userOtp)) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        return res.status(200).json({
            success: true,
            message: 'OTP verified successfully'
        });
    }
    catch (error) {
        console.error("Error in verifyOTP:", error);
    }
}

// Reset Password
module.exports.resetPassword = async (req, res) => {
    try {
        const { password, email } = req.body
        const { newPassword, confirmPassword } = password

        const user = await userSchema.findOne({ email })

        if (user) {
            if (newPassword === confirmPassword) {
                user.password = newPassword
                user.resetOtp = null
                user.resetOtpExpiry = null

                await user.save()
                return res.status(200).json({ message: 'Password reset successfully' })
            }
            else {
                return res.status(500).json({ message: 'Password not matched' })
            }
        }
    }
    catch (error) {
        console.error("Error in resetPassword:", error);
    }
}