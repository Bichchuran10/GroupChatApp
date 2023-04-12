const Message=require('../models/Message');
//const Group = require('../models/Group');
//const GroupUser = require('../models/GroupUser');
const { Op } = require('sequelize');

exports.saveMessage=async(req,res,next)=>{
    try{
        const message=req.body.message
        const groupId = req.body.groupId;
        const groupUser = await GroupUser.findOne({where: {
            groupId: groupId,
            userId: req.user.id
        }})
        if(!groupUser) {
            throw new Error('user not found in group');
        }
        await Message.create({
            message:message,
            userId:req.user.id,
            groupId: groupId,
            from: req.user.name
            
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
        const groupId = +req.query.groupId;
        console.log('msg id in backend:', lastMsgId);
        console.log('group id in backend:', groupId);
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
  



