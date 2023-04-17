const jwt=require('jsonwebtoken');
const User=require('../models/User')

exports.authenticate=(req,res,next)=>{
    try{
        const token=req.header('Authorization');
        console.log("the token",token) ///check if we are getting the token
        const user=jwt.verify(token,process.env.TOKEN_SECRET);
        User.findByPk(user.userid).then(user=>{
            console.log(JSON.stringify(user));
            req.user=user;
            next()
        }).catch(err=>{
            throw new Error(err)
        })
    }
    catch(err){
        console.log(err)
        return res.status(401).json({
            success:false
        })
    }
}