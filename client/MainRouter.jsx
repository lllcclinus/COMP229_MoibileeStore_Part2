/*import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './core/Home' 
import Users from './user/Users.jsx'
import Signup from './user/Signup.jsx'
import Signin from './auth/Signin.jsx'
import Profile from './user/Profile.jsx'
import Switch from 'react'
import PrivateRoute from 'react'
import EditProfile from 'react'
import Menu from 'react'
const MainRouter = () => {
return ( <div> 
<Routes>
        <Route exact path="/" element={<Home />} /> 
                <Route path="/users" component={Users} />
                <Route path="/signup" component={Signup} />
                <Route path="/signin" component={Signin} />
                <Route path="/user/:userId" component={Profile} />
                <Menu/>
     <Switch>

<PrivateRoute path="/user/edit/:userId" component={EditProfile}/> 
<Route path="/user/:userId" component={Profile}/>
</Switch>
        
        
</Routes>
</div> 
)
}
export default MainRouter*/




import React from 'react';
import { Routes, Route } from 'react-router-dom';
//import React from 'react'
//import {Route, Routes} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users.jsx'
import Signup from './user/Signup.jsx'
import Signin from './lib/Signin.jsx'
import Profile from './user/Profile.jsx'
import Switch from 'react'
import PrivateRoute from './lib/PrivateRoute.jsx'
import EditProfile from './user/EditProfile.jsx'
import Menu from './core/Menu'
import Products from './user/Products.jsx'
import ProductProfile from './user/ProductProfile.jsx'
import Cart from './user/Cart.jsx'
import CreateProduct from './user/CreateProduct.jsx'
import EditProduct from './user/EditProduct.jsx'

function MainRouter() {
  return (
    <div>
      <Menu />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/createproduct" element={<CreateProduct />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/user/edit/:userId" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
        <Route path="/user/edit2/:userId" element={<PrivateRoute><EditProduct /></PrivateRoute>} />
        <Route path="/user/:userId" element={<Profile />} />
        <Route path="/product/:userId" element={<ProductProfile />} />
      </Routes>
    </div>
  );
}

export default MainRouter;
