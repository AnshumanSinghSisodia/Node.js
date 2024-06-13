const express=require('express');
const router=express.Router();
const mongoose= require('mongoose');

const checkAuth=require('../middleware/check-auth');

const orderController=require('../controllers/orders')

router.get('/',checkAuth, orderController.orders_get_all);

router.post('/', checkAuth, orderController.orders_create_order);

router.get('/:orderid',checkAuth, orderController.order_by_id);

router.delete('/:orderid',checkAuth, orderController.delete_by_id);

module.exports = router;