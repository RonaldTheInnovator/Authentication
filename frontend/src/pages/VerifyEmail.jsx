import React, { useRef, useState } from "react";
import '../styles/VerifyEmail.css';
import Input from "../components/input";
import { Lock, Mail, User} from 'lucide-react';
import { Link } from "react-router-dom";
import { userStore } from "../app/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


function VerifyEmail() {
     const [verificationCode, setVerificationCode]=useState(["","","","","",""]);
     const navigate = useNavigate()
     const inputRefs=Array(6).fill(null).map(()=> useRef(null));
     const {loading,verifyEmail}=userStore()


     const handleChange =(index, value)=> {
        if(!/^\d?$/.test(value)) return;
        const newCode=[...verificationCode];
        newCode[index]=value;
        if(index<5 && value && verificationCode.slice(0,index).includes("")){
            return;
        }
        if(!value && index<5){
            const hasNumbersAfter= newCode.slice(index+1).some(digit=>digit!=="")
            if(hasNumbersAfter){
                setVerificationCode(["","","","","",""]);
                inputRefs[0].current.focus();
                return;
            }
        }
        setVerificationCode(newCode)
        if(value && index<5){
            inputRefs[index+1].current.focus()
        }
     }
     const handleKeyDown=(index,e)=>{
        if(e.key==='Backspace'){
            if(!verificationCode[index] && index>0){
                const hasNumberAfter= verificationCode.slice(index).some(digit=>digit!=="");
                if(hasNumberAfter){
                    setVerificationCode(["","","","","",""]);
                    inputRefs[0].current.focus();
                return;
                }
                inputRefs[index-1].current.focus()
            }

        }
     }

     const handlePaste=(e)=>{
        e.preventDefault();
        const pastedData=e.clipboardData.getData("text").slice(0,6).split("");
        
        // console.log(pastedData);
        const newCode=[...verificationCode];
        // console.log(newCode);
        pastedData.forEach((value,index)=> {
            if(index<6 && /^\d?$/.test(value)){
                newCode[index]=value
            }
        })
        setVerificationCode(newCode);
        // console.log(newCode);
        if(pastedData.length>0){
            inputRefs[Math.min(pastedData.length,5)].current.focus()
        }
        
        
     }

     const handleVerify=async(e)=>{
        e.preventDefault();
        const code=verificationCode.join("");
        console.log(code);
        // if(code.length===6){
        //     console.log("VerificationCode", verificationCode);
        // }
        try{

            const response=await verifyEmail(code);
            toast.success(response,{
            position:'top-center',
             autoClose: 3000
              });
             navigate("/");

        }catch(err){
            toast.error(err,{
             position:'top-center',
             autoClose: 3000
            });
            
        }
        

     }
     const isComplete=verificationCode.every(digit=>digit!=="")

  return (
    <div className="verify-container">
        <form onSubmit={handleVerify} >
            <div className="verify">
                <h1 className="verify__title">Verify Your Email</h1>
                <p className="verify__subtitle">
                    Enter the verification code sent to your email
                </p>
                <div className="verify__inputs">
                    {verificationCode.map((digit, index)=> ( 
                        < input type="text" 
                            ref={inputRefs[index]} 
                            maxLength={1} 
                            className="verify__input" 
                            key={index} 
                            value={digit}
                            onChange={(e)=>handleChange(index, e.target.value)}
                            onKeyDown={(e)=>handleKeyDown(index,e)}
                            onPaste={handlePaste}
                        /> 
                        )) 
                    }
                </div>
                <button className="verify__button" disabled={!isComplete}>Verify Email</button>
            </div>
        </form>

    </div>

  )
}


export default VerifyEmail