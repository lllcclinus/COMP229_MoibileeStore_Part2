import express from 'express'
import productCtrl from '../controllers/product.controller.js';
import authCtrl from '../controllers/auth.controller.js';
import userCtrl from '../controllers/user.controller.js'

const router = express.Router();

router.route('/api/products')
    .get(productCtrl.list);

router.route('/api/products/by/:userId')
    .post(authCtrl.requireSignin, authCtrl.hasAuthorization, productCtrl.create);

router.route('/api/products/:productId')
    .get(productCtrl.read)
    .put(authCtrl.requireSignin, productCtrl.update)
    .delete(authCtrl.requireSignin, productCtrl.remove);

router.param('productId', productCtrl.userByID)
router.param('userId', userCtrl.userByID)



export default router
