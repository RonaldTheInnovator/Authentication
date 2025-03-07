import mongoose, { mongo } from "mongoose";
import validator from 'validator';

const userSchema = new mongoose.Schema( {
    name: {
        type:String,
        required:[true,'Please enter your name'],
        maxLength:[25,'Invalid name. Please enter a name with fewer than 25 characters'],
        minLength:[3,"Name should contain more than 3 characters"]
    },
    email: {
        type:String,
        required:[true,'Please enter your email'],
        unique:true,
        validate:[validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type:String,
        required:[true,'Please enter your password'],
        select:false
    },
    lastLogin: {
        type:Date,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date

},{timestamps:true})

export default mongoose.model("User", userSchema)