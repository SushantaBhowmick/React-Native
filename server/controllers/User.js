import { User } from "../models/users.js";
import sendMail from "../utils/sendMail.js";
import { sendToken } from "../utils/sendToken.js";

export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        // const { avatar } = req.files;
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User Already Exists"
            })
        }
        const otp = Math.floor(Math.random() * 1000000)
        user = await User.create({
            name,
            email,
            password,
            avatar: {
                public_id: "tempId",
                url: "tempUrl",
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

        user.task = user.tasks.find(task => task._id.toString() !== taskId.toString())
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
