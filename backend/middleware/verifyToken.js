import jwt, { decode } from 'jsonwebtoken';
import handleAsyncError from './handleAsyncError.js';
import HandleError from '../utils/handleError.js';

export const verifyToken=handleAsyncError(async(req,res,next)=>{
// console.log(req.cookies);

// try{
    const { token }= req.cookies;
    if(!token){
        return next(new HandleError("Unauthenticated to access this resource. Please login to continue...",400));
        // return res.status(400).json({
        //     success:false,
        //     message:"Unauthenticated to access this resource. Please login to continue..."
        // })
    }
    const decodedData=jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(decodedData);
    if(!decodedData){
        return next(new HandleError("Unauthenticated to access this resource. Please login to continue...",400));
        // return res.status(400).json({
        //     success:false,
        //     message:"Unauthenticated to access this resource. Please login to continue..."
        // })

    }
    req.userId=decodedData.userId;
    next();
    

// }catch(err){
//     return res.status(500).json({
//         success:false,
//         message:"Server Error"
//     })

// }

})