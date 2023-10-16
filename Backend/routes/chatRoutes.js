const { Router } = require('express');
const verify = require('../Controllers/verifytoken');
const { addChat, getMessagesByChat, getAllChats, getUsernameByID } = require('../Controllers/chatcontroller');
const router = Router();
router.post('/chat', verify, addChat);
router.get('/getChat/:workshopID', verify, getMessagesByChat);
router.get('/getAllChat/:workshopid', verify, getAllChats);
router.get('/getUsername/:userId', verify, getUsernameByID);
module.exports = router;