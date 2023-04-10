const Message=require('../models/Message');
const { Op } = require('sequelize');

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
        const lastMsgId = +req.query.lastMsgId;
        console.log('msg id in backend:', lastMsgId);
        const messages=await Message.findAll({
            where:{
                id: {[Op.gt]: lastMsgId}
            }
        })
        res.status(200).json({message: messages});
      } 
    catch (error) {
        console.log(error);
        res.status(500).json({message: 'could not fetch messages'});
    }
}
  



