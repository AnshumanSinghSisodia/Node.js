const express =require('express');
const router= express.Router();

const multer=require('multer');
const checkAuth= require('../middleware/check-auth');
const productController= require('../controllers/products');

const storage= multer.diskStorage({
    destination: function(req, file,cb) {
        cb(null, './uploads/')
    },
    filename: function(req,file,cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
})

const fileFilter=(req, file,cb)=>{
    //reject a file
    if(file.mimetype=='image/jpeg' || file.mimetype=='image/png'){
        cb(null,true);
    }else{
        cb(null, false);
    }
}

const upload= multer({
    storage: storage,
    limits:{
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter
});

router.get('/',productController.products_get_all);

router.post('/', checkAuth,upload.single('productImage') ,productController.create_product);

router.get('/:productid',checkAuth,productController.product_by_id);

router.patch('/:productid',checkAuth, productController.patch_product_by_id);

router.delete('/:productid', checkAuth,productController.delete_product_by_id);

module.exports = router;