import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegistrationForm from "./pages/RegistrationForm";
import LoginForm from "./pages/LoginForm";
import VerifyEmail from "./pages/VerifyEmail";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import RedirectOnAuth from "./components/RedirectOnAuth";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { userStore } from "./app/store";
import NotFound from "./pages/NotFound";


function App() {
  const {isVerifyAuth,isAuthenticated, verifyAuth, user}=userStore();
  useEffect(()=>{
    verifyAuth()

  },[verifyAuth]);
  console.log("User Authenticated",isAuthenticated);
  console.log("User",user);
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<ProtectedRoutes>  <Home/> </ProtectedRoutes>}/>
      <Route path="/register" element={<RedirectOnAuth>  <RegistrationForm/>  </RedirectOnAuth> }/>
      <Route path="/login" element={<RedirectOnAuth>   <LoginForm/>  </RedirectOnAuth> }/>
      <Route path="/verifyEmail" element={<VerifyEmail/>}/>
      <Route path="/forgotPassword" element={<ForgotPassword/>}/>
      <Route path="/resetPassword/:token" element={<ResetPassword/>}/>
      <Route path="*" element={<NotFound/>}/>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App