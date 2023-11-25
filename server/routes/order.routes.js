import express from 'express'
import orderCtrl from '../controllers/order.controller.js'; 
import authCtrl from '../controllers/auth.controller.js';
import userCtrl from '../controllers/user.controller.js'

const router = express.Router();

router.route('/api/orders')
    .get(orderCtrl.list); 

router.route('/api/orders/by/:userId')
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization, orderCtrl.create);

router.route('/api/orders/:orderId')
    .get(orderCtrl.read)
    .put(authCtrl.requireSignin, orderCtrl.update)
    .delete(authCtrl.requireSignin, orderCtrl.remove); 

	router.param('orderId', orderCtrl.userByID)
	router.param('userId', userCtrl.userByID)
	


export default router
