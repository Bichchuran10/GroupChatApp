const express = require('express');
const router = express.Router();

const adminController = require('../controller/admin');
const userAuthentication = require('../middleware/auth');

router.post('/addUser', userAuthentication.authenticate, adminController.addUser);
router.put('/makeAdmin', userAuthentication.authenticate, adminController.makeAdmin);
router.put('/removeAdmin', userAuthentication.authenticate, adminController.removeAdminPermission);
router.delete('/removeFromGroup',userAuthentication.authenticate, adminController.removeUserFromGroup);

module.exports = router;