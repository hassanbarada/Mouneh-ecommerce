const {Router} = require('express');
const sendSMS = require('../Controllers/messageController')

const router = Router();

router.post('/sendSMS', (req, res) => {
    sendSMS(res);
});

module.exports = router;