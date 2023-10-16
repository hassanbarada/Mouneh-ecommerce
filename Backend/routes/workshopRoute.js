const { Router } = require('express');
const verify = require('../Controllers/verifytoken');
const { addWorkshop,updateWorkshop,deleteWorkshop,getAllWorkshops,getWorkshopById} = require('../Controllers/workshopcontrollers'); // Use destructuring to import the updateUser function

const router = Router();

router.put('/workshopupdate/:workshopID', verify, updateWorkshop);
router.delete('/delete/:workshopID', verify, deleteWorkshop);
router.get("/getworkshop/:workshopID", getWorkshopById);
router.get('/allworkshop', getAllWorkshops );
router.post('/workshop', verify, addWorkshop);

module.exports = router;