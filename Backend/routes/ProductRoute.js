const { Router } = require('express');
const verify = require('../Controllers/verifytoken');
const { addProduct, updateProduct, deleteProduct, getProduct, getAllProduct, getAllProductByCategory,getMyProducts,getinfoProducts,getNewProduct,ReturnProductQuantity,updateProductQuantity,getAllCategory,upload,getProductPhoto,updatemyproduct,getWaitingProducts,updateProductStatus } = require('../Controllers/ProductsController');

const router = Router();


router.put('/products/:userID/:productID', upload.single("imagePath") , updateProduct);
router.post('/products', upload.single("imagePath"),verify, addProduct);
router.delete("/products/:userID/:productID", verify, deleteProduct);
router.get('/products/find/:productID', getProduct);
router.get('/products', getAllProduct);
router.get('/products/:Category', getAllProductByCategory);
router.get('/products/my-products/:id', verify, getMyProducts); 
router.get('/products/fetchinfo/:id/:productID', verify, getinfoProducts); 
router.get('/newProduct',getNewProduct);
router.patch('/update-quantity/:productID', updateProductQuantity);
router.patch('/return-quantity/:productID', ReturnProductQuantity);
router.get("/categories", getAllCategory);
router.get("/products/:productID/photo", getProductPhoto);
router.put("/products/updateproducts/:id/:productID",verify, updatemyproduct);
router.get('/waitingproduct',getWaitingProducts);
router.put('/updateProductStatus/:productID',verify,updateProductStatus);


module.exports = router;
