import User from '../models/user.model'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import config from './../../config/config'

router.route('/auth/signin').post(authCtrl.signin)
const signin = (req, res) => { 


}
const signout = (req, res) => { 


}
const requireSignin = …
const hasAuthorization = (req, res) => { 

    
 }
export default { signin, signout, requireSignin, hasAuthorization }