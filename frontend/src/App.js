import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import SignUP from "./Components/SignUP";
import Profile from "./Components/Profile";
import PrivateComponent from "./Components/PrivateComponent";
import DashBoard from "./Components/Admin/DashBoard";
import UpdateUser from "./Components/Admin/UpdateUser";
import AddUser from "./Components/Admin/AddUser";

const App = () => {
    return ( <
        div className = "app" >
        <
        Routes >
        <
        Route element = { < PrivateComponent / > } >
        <
        Route path = "/profile"
        element = { < Profile / > }
        /> <
        Route path = "/dash"
        element = { < DashBoard / > }
        /> <
        Route path = "/update/:id"
        element = { < UpdateUser / > }
        /> <
        Route path = "/adduser"
        element = { < AddUser / > }
        /> <
        /Route> <
        Route path = "/login"
        element = { < Login / > }
        /> <
        Route path = "/"
        element = { < SignUP / > }
        /> <
        /Routes> <
        /div>
    );
};

export default App;