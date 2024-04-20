const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler=require("../utils/errorhandler")
const jwt=require("jsonwebtoken")
const User=require("../models/userModel")

exports.isAuthenticatedUser=catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies;
    //  console.log(token)

    if(!token){
        return next(new ErrorHandler("please login to access this resource",401))
    }

const decodeData=jwt.verify(token,process.env.JWT_SECRET)
   req.user= await User.findById(decodeData.id)
   next()
})


exports.authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        // console.log(req.user.role+" "+roles[0])
        if(!roles.includes(req.user.role)){
           return next( new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`,403)
        )}
        next();

    };
}