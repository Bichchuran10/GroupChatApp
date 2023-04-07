const User=require('../models/User')


exports.signup=async(req,res,next)=>{

    try{
        const {name,email,phone,password}=req.body
        if(validatestring(name) || validatestring(email) 
       || validatestring(password) || validatestring(Phonenumber)){
         return res.status(400).json({error:"All feilds are required"})
       }

       const signupuser=await User.findAll({where : {email}})
       if(signupuser.length>0){
         console.log(signupuser);
         res.status(401).json({ message:'User already exists, Please Login'});
      }
      else{
        const saltRounds=10
        bcrypt.hash(password,saltRounds,async(err,hash)=>{
            console.log(err)
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
            res.status(201).json({
                success:true,
                message:"User created successfully"
            })
        })
      }
    }
    catch(err){

        res.status(500).json({
            success:false,
            message:err
        })

    }



}


function validatestring(string){
    if(string==undefined || string.length===0)
     return true;
     else {
       return false;
     }
 }