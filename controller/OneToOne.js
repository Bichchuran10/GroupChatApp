const OneToOne = require('../models/OneToOne')
const User = require('../models/User')
const { Op } = require('sequelize');
const { Server } = require('engine.io');

exports.createChat = async (req, res) => {
    try {
       
        const receiverId = req.query.receiverId
        console.log('create chat controller',receiverId)
        const message = req.body.sentMessage
        const timeInMs = req.body.timeInMs
        const timeString = req.body.timeString
      
        const chat=await OneToOne.create({
            receiverId,
            message,
            timeInMs,
            timeString,
            userId: req.user.id
        })
        res.json({ success: true,userId: req.user.id, chat })
    } catch (error) {
        console.log(error)
    }

}


exports.loadPreviousChats = async (req, res) => 

{

    try{


    const receiverId = req.query.receiverId
    console.log("controller load prev chat id",receiverId)

    const receiverData = await User.findByPk(receiverId)
    console.log("controller load prev chat data",receiverData)
    const chats = await OneToOne.findAll(
        {
            where: {
                [Op.or]: [
                    {
                        [Op.and]: [
                            { receiverId: receiverData.id },
                            { userId: req.user.id }
                        ]
                    },
                    {
                        [Op.and]: [
                            { receiverId: req.user.id },
                            { userId: receiverData.id }
                        ]
                    }
                ]
            },
            order: [['timeInMs', 'ASC']]
        })
    res.json({ chats, userId: req.user.id })
    }
    catch(err)
    {
        console.log("error in controller load prev chats",err)
        res.json(500).json({success:false})
    }
}

exports.loadLiveReceiverMessages = async (req, res) => {
   
    const receiverId = req.query.receiverId
    console.log('loadlive contro id',receiverId)
    const timeInMs = req.query.timeInMs
    const receiverData = await User.findByPk(receiverId)
 
    const chats = await OneToOne.findAll(
        {
            where: {
                [Op.and]: [
                    { receiverId: req.user.id },
                    { userId: receiverData.id },
                    { timeInMs: { [Op.gt]: timeInMs } }
                ]
            },
            order: [['timeInMs', 'ASC']]
        })
    res.json({ chats, userId: req.user.id })
}