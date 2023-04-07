const User=require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


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

exports.login=async(req,res,next)=>{

    try{
        const {email,password}=req.body

        if(isStringInvalid(email)|| isStringInvalid(password))
        {
            return res.status(400).json({error:"All fields are required"})
        }
            const user=await User.findOne({where :{email:email}})

            if(!user) {
                return res.status(404).json({message: 'user does not exist'});
            }
            bcrypt.compare(password,user[0].password,(error,result)=>{
            if(error)
            {
                return res.status(500).json({success: false, message:"Something went wrong"})
            }
            if(result==true)
            {
            res.status(200).json({
                success:true,
                message:"user logged in successfully",
                token:generateToken(user[0].id,user[0].name)
            }) 
            }
        else {
            res.status(401).json({success: false, message: 'password is incorrect'});
        }
    });
    
    }
    catch(err)
    {
        res.status(500).json({
            success:false,
            message:err
        })
    }
} 
  

function generateToken(id,name){
    return jwt.sign({userid:id,name:name},process.env.TOKEN_SECRET)
}