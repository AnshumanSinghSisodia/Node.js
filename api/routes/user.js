const express =require('express');
const router= express.Router();

const checkAuth=require('../middleware/check-auth')

const userController=require('../controllers/user');

router.post("/signup", userController.user_signup);

router.post('/login', userController.user_login);
    
router.delete('/:userId',checkAuth, userController.delete_user_by_id)
   
module.exports = router;