import { EMAIL_CONFIRMATION_TEMPLATE, PASSWORD_RESET_CONFIRMATION_TEMPLATE, PASSWORD_RESET_EMAIL_TEMPLATE } from './emailTemplate.js';
import  {mailTrapclient, sender} from './mailTrapConfig.js';
import handleAsyncError from '../middleware/handleAsyncError.js';


export const sendVerificationEmail = handleAsyncError(async(email, verificationToken)=> {
    // console.log(email, verificationToken)
    const recipient= [{email}]
    // try{
        const response=await mailTrapclient.send({
            from: sender,
            to: recipient,
            subject: "Verify Your Email to continue",
            html: EMAIL_CONFIRMATION_TEMPLATE.replace("{verificationCode}",verificationToken),
            category: "Email Address Verification",  
        })

        console.log("Email Sent Successfully")

    // }catch(err){
    //     console.log(`Error while sending verification email ${err.message}`)
    //     throw new Error(`Error while sending verification email ${err.message}`)

    // }
});

export const sendWelcomeEmail = handleAsyncError(async(email,name)=>{
    const recipient=[{email}];
    // try{
        const response=await mailTrapclient.send({
            from:sender,
            to:recipient,
            template_uuid: "80c51690-21eb-4e9f-bf1f-837c7adb8c3f",
            template_variables: {
                company_info_name: "Authentication Coding",
                name: name
            }
            

        })

    // }catch(err){
    //     console.log(`Error while sending welcome email ${err.message}`)
    //     throw new Error(`Error while sending welcome email ${err.message}`)

    // }
});
export const sendPasswordResetEmail=handleAsyncError(async(email,resetURL)=>{
    const recipient=[{email}];
    // try{
        const response=await mailTrapclient.send({
            from:sender,
            to:recipient,
            subject:"Reset Your Account Password",
            html: PASSWORD_RESET_EMAIL_TEMPLATE.replace("{resetURL}",resetURL),
            category: "Password Reset",

        })

    // }catch(err){
    //     console.log(`Error while sending reset email ${err.message}`)
    //     throw new Error(`Error while sending reset email ${err.message}`)

    // }


});

export const sendResetSuccessMail= handleAsyncError(async(email)=>{
    const recipient=[{email}]
    // try{
        const response=await mailTrapclient.send({
            from:sender,
            to:recipient,
            subject:"Your Password has been successfully reset",
            html: PASSWORD_RESET_CONFIRMATION_TEMPLATE,
            category: "Password Reset",

        })


    // }catch(err){
    //     console.log(`Error while sending reset confirmation email ${err.message}`)
    //     throw new Error(`Error while sending reset confirmation email ${err.message}`)

    // }
})
