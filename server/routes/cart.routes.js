import express from 'express'
import cartCtrl from '../controllers/cart.controller.js'; 
import authCtrl from '../controllers/auth.controller.js';
import userCtrl from '../controllers/user.controller.js'

const router = express.Router();

router.route('/api/carts')
    .get(cartCtrl.list); 

router.route('/api/carts/by/:userId')
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization, cartCtrl.create);

router.route('/api/carts/:cartId')
    .get(cartCtrl.read)
    .put(authCtrl.requireSignin, cartCtrl.update)
    .delete(authCtrl.requireSignin, cartCtrl.remove); 

	router.param('cartId', cartCtrl.userByID)
	router.param('userId', userCtrl.userByID)
	


export default router
