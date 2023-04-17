const express=require('express')
const router=express.Router()
const userController=require('../controller/user')
const userAuthentication=require('../middleware/auth')



router.post('/signup',userController.signup)
router.post('/login',userController.login)
router.get('/get-users',userAuthentication.authenticate, userController.getUsers)

module.exports=router;