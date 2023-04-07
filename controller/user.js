const User=require('../models/User')
const bcrypt=require('bcrypt')


exports.signup=async(req,res,next)=>{

    try{
        console.log("the req boy",req.body)

        const {name,email,phone,password}=req.body

        if(isStringInvalid(name)|| isStringInvalid(email) || isStringInvalid(phone) || isStringInvalid(password))
        
        {
            res.status(400).json({
                message:'err: Something is missing!!'
            })
        }
        

       const signupuser=await User.findAll({where : {email}})

       if(signupuser.length>0){
            console.log(signupuser);
            return res.status(401).json({ message:'User already exists, Please Login'});
        }
            console.log('creating user')
            const saltRounds=10
            bcrypt.hash(password,saltRounds,async(err,hash)=>{
                if(err) 
                {
                    throw new Error
                }
            await User.create({
                name,
                email,
                phone,
                password:hash
            })
            return res.status(201).json({
                success:true,
                message:"Successfuly signed up"
            })
        })

    }
    catch(err){

        res.status(500).json({
            success:false,
            error:err
        })

    }



}




 function isStringInvalid(string)
{
    if(string.length===0 || string==='undefined')
    {
        return true
    }
    else
    {
        return false
    }
}