import React, { useState } from "react";
import '../styles/NotFound.css';
import Input from "../components/input";
import { Home, Loader, Lock, Mail, User} from 'lucide-react';
import { Link } from "react-router-dom";
import { userStore } from "../app/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function NotFound() {
    const navigate = useNavigate();
    

  return (
    <div className="not-found">
        <div className="not-found-content">
            <div className="error-number">404</div>
            <h1 className="error-title">Page Not Found</h1>
            <p className="error-desription">
              The page you are looking for doesn't exist or has been moved  
            </p>
            <button className="home-button" onClick={()=>navigate("/")}>
                <Home size={20}/>
                Back to Home</button>
        </div>
        <div className="circles">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-3"></div>
        </div>
    </div>

  )
}

export default NotFound