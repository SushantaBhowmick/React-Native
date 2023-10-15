import { User } from "../models/users.js";
import sendMail from "../utils/sendMail.js";
import { sendToken } from "../utils/sendToken.js";
import cloudinary from 'cloudinary';
import fs from 'fs'


export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const avatar = req.files.avatar.tempFilePath;

        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists"
            })
        }

        const otp = Math.floor(Math.random() * 1000000)
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "android"
        })
        fs.rmSync("./tmp", { recursive: true })
        user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.url,
            },
            otp,
            otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000),
        })
        await sendMail(
            email,
            "Verify your account",
            `Your otp is ${otp}`
        )
        sendToken(res, user, 201, `OTP sent to your ${user.email}, please verify your account`)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const verify = async (req, res, next) => {
    try {
        const otp = Number(req.body.otp)
        const user = await User.findById(req.user._id);
        if (user.otp !== otp || user.otp_expiry < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP or has been Expired"
            })
        }
        user.verified = true;
        user.otp = null;
        user.otp_expiry = null;
        await user.save()

        sendToken(res, user, 200, "Account Verified")

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Enter All the fields"
            })
        }

        let user = await User.findOne({ email }).select("+password")
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Doesn't Exists"
            })
        }
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        sendToken(res, user, 200, `Login successfully`)

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const logout = async (req, res, next) => {
    try {

        res.status(200).cookie("token", null, {
            expires: new Date(Date.now()),
        }).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getMyProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)

        sendToken(res, user, 200, `Welcome Back! ${user.name}`)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id)
        const { name } = req.body;
        const avatar = req.files.avatar.tempFilePath;

        if (name) {
            user.name = name
        }
        if(avatar){
            await cloudinary.v2.uploader.destroy(user.avatar.public_id)
            const myCloud =  await cloudinary.v2.uploader.upload(avatar,{
                folder:"android"
            })
             fs.rmSync("./tmp", { recursive: true })
             user.avatar={
                public_id: myCloud.public_id,
                url: myCloud.url
             }
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
export const getAllUsers = async(req,res,next)=>{
    try {
        const users = await User.find();
        res.status(200).json({
            success:true,
            message:"Get All User Successfully",
            users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
    }

export const updatePassword = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select("+password")
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Enter All the fields"
            })
        }

        const isMatched = await user.comparePassword(oldPassword);
        if (!isMatched) {
            return res.status(400).json({
                success: false,
                message: "Invalid Old Password"
            })
        }
        user.password = newPassword

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password Updated Successfully!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const addTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const user = await User.findById(req.user._id)

        user.tasks.push(({
            title,
            description,
            completion: false,
            createdAt: new Date(Date.now())
        }))
        await user.save()
        res.status(200).json({
            success: true,
            message: "Task Added successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const removeTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        const user = await User.findById(req.user._id);

        user.tasks = user.tasks.filter(task => task._id.toString() !== taskId.toString())
        await user.save();

        res.status(200).json({
            success: true,
            message: "Task Deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        const user = await User.findById(req.user._id);

        user.task = user.tasks.find(task => task._id.toString() === taskId.toString())
        user.task.completion = !user.task.completion

        await user.save();

        res.status(200).json({
            success: true,
            message: "Task Updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const forgotPassword = async (req, res, next) => {
    try {

        const { email } = req.body;
        const user = await User.findOne({ email });;

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User Doesn't Exists"
            })
        }
        const otp = Math.floor(Math.random() * 1000000);

        user.resetPasswordOtp = otp;
        user.resetPasswordOtpExpiry = Date.now() + 10 * 60 * 1000;

        await user.save()
        const message = `Your otp for reseting the password is ${otp}. if you did not request for this, please ignore this email.`

        await sendMail(
            email,
            "Request for reseting password",
            message,
        )
        res.status(200).json({
            success: true,
            message: `OTP sent to ${email}`
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const resetPassword = async (req, res, next) => {
    try {
        const { otp, newPassword } = req.body;
        const user = await User.findOne({
            resetPasswordOtp: otp,
            resetPasswordOtpExpiry: { $gt: Date.now() }
        })


        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Otp invalid or has been Expired"
            })
        }

        user.password = newPassword;
        user.resetPasswordOtp = null;
        user.resetPasswordOtpExpiry = null;
        await user.save()

        res
            .status(200)
            .json({ success: true, message: `Password Changed Successfully` });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}