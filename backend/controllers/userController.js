import User from '../model/userModel.js';
import bcryptjs from 'bcryptjs';
import { generateTokenCookie } from '../utils/generateTokenCookie.js';
import { sendPasswordResetEmail, sendResetSuccessMail, sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/mailHandler.js';
import crypto from "crypto";
import HandleError from '../utils/handleError.js';
import handleAsyncError from '../middleware/handleAsyncError.js';

export const register = handleAsyncError(async (req, res, next)=>{
    const {name, email,password} = req.body;
    

        if(!name || !email || !password )
            // throw new Error('All fields are required!')
        return next(new HandleError("All fields are required!",400))

        const userExists= await User.findOne({ email});

        if(userExists){
            // throw new Error('User Email already exists. Please login to continue')
            return next(new HandleError("User Email already exists. Please login to continue",400))
        }
        const verificationToken = Math.floor(100000+Math.random()*900000).toString();

        const hashedPassword= await bcryptjs.hash(password.toString(),10)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now()+2*60*60*1000 //Within 2 hours
        })
       generateTokenCookie(res, user._id);
    
        // console.log(`This is the token: ${token}`)
        //EMAIL VERIFICATION FUNCTION
        await sendVerificationEmail(user.email, verificationToken)

        return res.status(200).json({
            success: true,
            message:"Registration Successful",
            user: {
                ...user._doc,
                password:undefined
            }
        })

    // } catch(err) {
    //     return res.status(400).json({
    //         success: false,
    //         message: err.message
    //     })

    // }

   
})

export const verifyEmail=handleAsyncError(async(req,res, next)=>{
    // console.log(req.body);
    const { code } =  req.body;
    // try{
        const user= await User.findOne({
            verificationToken:code,
            verificationTokenExpiresAt: {$gt:Date.now()}
        })
        if(!user){
            return next(new HandleError("Invalid verification code or it has expired. Please try again!",400))
            // return res.status(400).json({
            //     success:false,
            //     message:"Invalid verification code or it has expired. Please try again! "
            // })
        }

        user.isVerified=true;
        user.verificationToken=undefined;
        user.verificationTokenExpiresAt=undefined;
        await user.save();
        await sendWelcomeEmail(user.email, user.name);

        return res.status(200).json({
            success: true,
            message:"Your email has been successfully verified",
            user: {
                ...user._doc,
                password:undefined
            }
        })

    // }catch(err){
    //     return res.status(500).json({
    //         success: false,
    //         message: err.message
    //     })

    // }
    

});

export const logout = handleAsyncError(async(_,res)=>{
    // res.cookie("token",null,{
    //     expires:new Date(Date.now()),
    //     httpOnly:true
    // })
    
    //SECOND METHOD OF CLEARING COOKIE
    res.clearCookie("token");

    return res.status(200).json({
        success: true,
        message:"Successfully logged Out"
        
    })
});

export const login=handleAsyncError(async(req,res, next)=>{
    const {email, password} =req.body
    // try{
        const user = await User.findOne({ email}).select("+password");
        if(!user){
            return next(new HandleError("Invalid credentials",400));
            // return res.status(400).json({
            //     success:false,
            //     message:"Invalid credentials"
            // })
        };
        
        //COMPARE PASSWORD FROM REQ AND DATABASE
        const isValidPassword=await bcryptjs.compare(password.toString(),user.password)
        
        if(!isValidPassword){
            
            return next(new HandleError("Invalid credentials",400));
            // return res.status(400).json({
            //     success:false,
            //     message:"Invalid credentials"
            // })
        };

        //SETRTING COOKIE
        generateTokenCookie(res,user._id);
        user.lastLogin = new Date();
        await user.save();
        return res.status(200).json({
            success:true,
            message:"User logged in!",
            user: {
                ...user._doc,
                password:undefined
            }
        })



    // }catch(err){
    //     return res.status(500).json({
    //         success: false,
    //         message: err.message
    //     })

    // }
});

export const forgotPassword=handleAsyncError(async (req,res, next)=> {
    const {email}=req.body;

    // try{
        const user = await User.findOne({email});
        if(!user){
            return next(new HandleError("User not found!",400));
            // res.status(400).json({
            //     success:false,
            //     message:"User not found!"
            // })
        }
        const resetToken=crypto.randomBytes(20).toString("hex");
        // console.log(resetToken);
        const resetPasswordExpire=Date.now()+30*60*1000 // 30 minutes
        user.resetPasswordToken=resetToken;
        user.resetPasswordExpire=resetPasswordExpire;
        await user.save();
        await sendPasswordResetEmail(user.email,`${process.env.FRONTEND_URL}/resetPassword/${resetToken}` )
        return res.status(200).json({
            success:true,
            message:"Instruction to reset your password has been sent to your email."
        })
        


    // }catch(err){
    //     return res.status(500).json({
    //         success: false,
    //         message: err.message
    //     })

    // }
});

export const resetPassword = handleAsyncError(async(req, res, next) => {
    // console.log(req.params);
    const { token } = req.params;
    const { password } = req.body;
    // try {

   
    const user = await User.findOne({
        resetPasswordToken:token,
        resetPasswordExpire: {$gt:Date.now()}
    })
    if(!user){
        return next(new HandleError("Invalid or expired reset token",400));
    //     return res.status(400).json({
    //     success:false,
    //     message: "Invalid or expired reset token"
    //   })  
    }
    const hashedPassword=await bcryptjs.hash(password.toString(),10)
    user.password=hashedPassword
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire=undefined;
    await user.save();
    // Sending Email
    await sendResetSuccessMail(user.email);





    return res.status(200).json({
        success: true,
        message: "Password Reset Successful"
    })
// }catch(err){
//     return res.status(500).json({
//         success: false,
//         message: err.message
//     })

// }
    

});

export const verifyAuth = handleAsyncError(async(req,res, next)=> {

    // console.log(req.userId);
    // try{
        const user= await User.findById(req.userId)
        if(!user){
            return next(new HandleError("No user found!",400));
            // return res.status(400).json({
            //     success:false,
            //     message: "No user found!"
            //   })  

        }
        res.status(200).json({
            success:true,
            user: {
                ...user._doc,
                password:undefined
            }
        })

    // }catch(err){
    //     return res.status(500).json({
    //         success: false,
    //         message: err.message
    //     })

    // }
    
});