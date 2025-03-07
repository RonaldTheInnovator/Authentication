import React, { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { userStore } from "../app/store";



function RedirectOnAuth({children}) {

    const {isAuthenticated, user}=userStore();
    if(isAuthenticated && user.isVerified){
        return <Navigate to="/" replace/>
    }
     
  return children
}


export default RedirectOnAuth