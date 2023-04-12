const express = require('express');
const router = express.Router();


const chatController = require('../controller/chat');
const userAuthentication=require('../middleware/auth')

router.post('/addParticipant', userAuthentication.authenticate, chatController.addParticipant);
router.post('/nameTheGroup', userAuthentication.authenticate, chatController.setGroupName);
router.get('/getGroups', userAuthentication.authenticate, chatController.getGroups);

module.exports = router;