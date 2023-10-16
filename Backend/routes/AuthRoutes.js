const {Router} = require('express');
const {registerUser, loginUser,forgot,reset} = require("../Controllers/AuthController");

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password',forgot);
router.post('/reset-password/:id/:token',reset);

module.exports = router;