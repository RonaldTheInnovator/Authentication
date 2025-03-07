import jwt from 'jsonwebtoken';

export const generateTokenCookie = (res, userId)=> {
    const token = jwt.sign({userId}, process.env.JWT_SECRET_KEY,{
        expiresIn: "7d"
    })
    const options={
        expires:new Date(Date.now() + process.env.EXPIRE_COOKIE*24*60*60*1000),

        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:"strict"
    }
    res.cookie("token", token, options)
    return token;

}