import React, { useRef, useState } from "react";
import '../styles/VerifyEmail.css';
import Input from "../components/input";
import { Lock, Mail, User} from 'lucide-react';
import { Link, Navigate } from "react-router-dom";
import { userStore } from "../app/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function ProtectedRoutes({children}) {
    const {isAuthenticated, user}=userStore();
    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }
    if(!user.isVerified){
        return <Navigate to="/verifyEmail" replace/>
    }
   
  return children
}


export default ProtectedRoutes