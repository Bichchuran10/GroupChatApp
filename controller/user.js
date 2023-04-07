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

// exports.login=async(req,res,next)=>{

//     try{
//         const {email,password}=req.body

//         if(isStringInvalid(email)|| isStringInvalid(password))
//         {
//             return res.status(400).json({error:"All fields are required"})
//         }
//             const user=await User.findAll({where :{email:email}})
//         console.log("here is your user",user)
//             if(!user) {
//                 return res.status(404).json({message: 'user does not exist'});
//             }
//             bcrypt.compare(password,user[0].password,(error,result)=>{
//                 console.log("password known by db",user[0].password)
//                 console.log("password known by user",password)
//                 console.log(result)
//             if(error)
//             {
//                 throw new Error
//             }
//             if(result==true)
//             {
//             res.status(200).json({
//                 success:true,
//                 message:"user logged in successfully",
//                 token:generateToken(user[0].id,user[0].name)
//             }) 
//             }
//         else {
//             res.status(401).json({success: false, message: 'password is incorrect'});
//         }
//     });
    
//     }
//     catch(err)
//     {
//         res.status(500).json({
//             success:false,
//             message:err
//         })
//     }
// } 

exports.login= async (req,res,next)=>{
    try{
         const {email,password }=req.body
        if(isStringInvalid(email) || isStringInvalid(password)){
          return res.status(400).json({error:"All fields are required"})
          }
        const user=await User.findAll({where : {email}})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
             if(err){
               res.status(500).json({  message:"something went wrong"})
             }
             else if(result===true){
             res.status(200).json({ success: true, message:"user logged successfully",token:generateToken(user[0].id,user[0].name)})
             }
     
             else{
             res.status(401).json({ success: false, message:"incorrect password"})
                }
             }
           )}
        else{
          res.status(404).json({success:false, message: "User not found"})
        }
       
       }
       catch(err){
       res.status(500).json({message: err, success:false})
     }
}
  

function generateToken(id,name){
    console.log("executed successfully",id,name)
    console.log(process.env.TOKEN_SECRET)
    return jwt.sign({userid:id,name:name},process.env.TOKEN_SECRET)
}