import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password must be 8 character"],
        select: false,
    },

    avatar: {
        public_id: String,
        url: String,
    },

    tasks: [{
        title: String,
        description: String,
        completion: Boolean,
        createdAt: Date
    }],
    verified: {
        type: Boolean,
        default: false,
    },
    otp: Number,
    otp_expiry: Date,
    resetPasswordOtp: Number,
    resetPasswordOtpExpiry: Date,

},
)


//jwt token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_COOKIE_EXPIRE * 24 *60 * 60 *1000
    })
}

//hash the password
userSchema.pre("save",async function(next){
if(!this.isModified('password')) return next()

const salt = await bcrypt.genSalt(10);
this.password = await bcrypt.hash(this.password,salt);
next()

})

//compare password
userSchema.methods.comparePassword = async function(password){

   return await bcrypt.compare(password,this.password);
}

//otp verify or either deleete the user
userSchema.index({otp_expiry:1},{expireAfterSeconds:0})

export const User = mongoose.model("User", userSchema)