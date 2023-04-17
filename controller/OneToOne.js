const OneToOne = require('../models/OneToOne')
const User = require('../models/User')
const { Op } = require('sequelize');

exports.createChat = async (req, res) => {
    try {
        const receiverName = req.body.currentTextingPerson
        const message = req.body.sentMessage
        const timeInMs = req.body.timeInMs
        const timeString = req.body.timeString
        const receiverData = await User.findOne({ where: { name: receiverName } })
        await OneToOne.create({
            receiverId: receiverData.id,
            message,
            timeInMs,
            timeString,
            userId: req.user.id
        })
        res.json({ success: true })
    } catch (error) {
        console.log(error)
    }

}


exports.loadPreviousChats = async (req, res) => {
    const receiverName = req.query.receiverName
    const receiverData = await User.findOne({ where: { name: receiverName } })
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

exports.loadLiveReceiverMessages = async (req, res) => {
    const receiverName = req.query.receiverName
    const timeInMs = req.query.timeInMs
    const receiverData = await User.findOne({ where: { name: receiverName } })
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