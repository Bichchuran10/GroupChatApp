const express=require('express')
const router=express.Router()

const messageController=require('../controller/message')
const userAuthentication=require('../middleware/auth')

router.post('/send',userAuthentication.authenticate,messageController.saveMessage)


module.exports=router;