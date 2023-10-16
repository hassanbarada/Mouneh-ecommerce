const {Router} = require('express');
const sendEmail = require('../Controllers/mailControler');

const router = Router();

router.post('/sendEmail', sendEmail);

module.exports = router;