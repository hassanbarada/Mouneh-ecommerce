const { Router } = require('express');
const verify = require('../Controllers/verifytoken');
const { registerForWorkshop, fetchUserWorkshops,getAllUserWorkshops,isRegisteredInWorkshop,fetchWorkshopRegisteredUsers,unregisterUserFromWorkshop } = require('../Controllers/userworkshopcontrollers');

const router = Router();

// Register user for a workshop
router.post('/registeruserworkshop/:workshopID', verify, registerForWorkshop);

// Fetch workshops registered by the user
router.get('/userworkshops', verify, fetchUserWorkshops);
router.get('/getuserworkhsops/:userId', verify, getAllUserWorkshops);
router.get('/isregistered/:userId/:workshopId', verify, isRegisteredInWorkshop);
router.get('/:workshopID/registered-users', fetchWorkshopRegisteredUsers);
router.delete('/:workshopId/unregister/:userId', unregisterUserFromWorkshop);


module.exports = router;
