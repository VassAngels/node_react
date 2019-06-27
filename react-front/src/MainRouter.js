import React from "react";
//Importing components 
import {Route,Switch} from 'react-router-dom'
import Home from "./core/Home";
import Menu from "./core/Menu";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Users from "./user/Users"
import EditProfile from "./user/EditProfile";
import PrivateRoute from './auth/PrivateRoute'
import ForgotPassword from './user/ForgotPassword'


const MainRouter = () => (
    <div>
        <Menu/>
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/Signup" component ={Signup}></Route>
            <Route exact path="/Signin" component ={Signin}></Route>
            <Route exact path="/user/:userId" component ={Profile}></Route>
            <Route exact path="/users" component={Users}></Route>
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile}></PrivateRoute>
            <Route exact path="/forgot-password" component={ForgotPassword}></Route>
        </Switch>
    </div>
)

export default MainRouter;
