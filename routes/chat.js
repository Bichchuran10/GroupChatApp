const express = require('express');
const router = express.Router();


const chatController = require('../controller/chat');
const oneToOneController = require('../controller/OneToOne')
const userAuthentication=require('../middleware/auth')


router.post('/create', userAuthentication.authenticate, oneToOneController.createChat)
router.get('/load-previous-chats', userAuthentication.authenticate, oneToOneController.loadPreviousChats)
router.get('/load-live-receiver-messages', userAuthentication.authenticate, oneToOneController.loadLiveReceiverMessages)
router.post('/addParticipant', userAuthentication.authenticate, chatController.addParticipant);
router.post('/nameTheGroup', userAuthentication.authenticate, chatController.setGroupName);
router.get('/getGroups', userAuthentication.authenticate, chatController.getGroups);
router.get('/getMembers', userAuthentication.authenticate, chatController.getMembers);

module.exports = router;