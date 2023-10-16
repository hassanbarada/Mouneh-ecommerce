const { Router } = require('express');
const verify = require('../Controllers/verifytoken');
const { updateUser,deleteUser,getUser,getAllUser, statUser} = require('../Controllers/UsersController'); // Use destructuring to import the updateUser function

const router = Router();

router.put('/users/:id', verify, updateUser);
router.delete('/users/:id', verify, deleteUser);
router.get('/users/find/:id',verify ,  getUser );
router.get('/users', verify, getAllUser );
router.get('/users/stats', verify, statUser );

module.exports = router;