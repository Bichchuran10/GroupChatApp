const Message=require('../models/Message');

exports.saveMessage=async(req,res,next)=>{
    try{
        const message=req.body.message
        await Message.create({
            message:message,
            userId:req.user.id
            
        })
        return res.status(200).json({
            success:true,
            message:'message saved to db'
        })
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'something went wrong'});
    }
}

exports.fetchMessage=async(req,res,next)=>{
    try{
        const messages=await Message.findAll()
        res.status(200).json({message: messages});
      } 
    catch (error) {
        console.log(error);
        res.status(500).json({message: 'could not fetch messages'});
    }
}
  



