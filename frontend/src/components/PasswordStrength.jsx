import React, { useMemo } from "react";
import '../styles/PasswordStrength.css';
import { Check } from "lucide-react";

function PasswordStrength({ password }) {
  const calculateStrength = (pwd) => {
    let strength=0;
    const checks = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),  // ✅ Fixed this line
      special: /[!@#$%^&*().,?"{}|<>]/.test(pwd),
    };
    strength+=checks.length?1:0;
    strength+=checks.uppercase?1:0;
    strength+=checks.lowercase?1:0;
    strength+=checks.number?1:0;
    strength+=checks.special?1:0;
    

    return {
      score:strength,
      checks
    };
  };

//   const strength = useMemo(() => calculateStrength(password), [password]);
  // console.log(checks);
const { checks, score } = useMemo(() => calculateStrength(password), [password])
// console.log(useMemo(() => calculateStrength(password), [password]));
const getStrengthText= (score)=>{
  if(score===0) return "Very Weak"
  if(score===1) return "Weak"
  if(score===2) return "Fair"
  if(score===3) return "Good"
  if(score===4) return "Strong"
  return "Great Stuff! Excellent"
}

const getStrengthTextClass=(score)=> {
  if(score===0) return "very-weak"
  if(score===1) return "weak"
  if(score===2) return "fair"
  if(score===3) return "good"
  if(score===4) return "strong"
  return "veryStrong"
}
const strengthText = getStrengthText(score);
const strengthClass=getStrengthTextClass(score)

  

  return (
    <div className={`strength-container ${password.length>0?'has-input':''}`}>
      <div className="strength-header">
        <span className="strength-label">Password Strength</span>
        <span className="strength-text">{ strengthText }</span>
      </div>
      <div className="strength-meter">
        <div className={`strength-progress  ${strengthClass}`} />
      </div>
      <div className="requirements-list">
        {[
            {text:'Contains uppercase letter',met:checks.uppercase},
            {text:'Contains lowercase letter',met:checks.lowercase},
            {text:'Contains number',met:checks.number},
            {text:'Contains special character',met:checks.special},
            {text:'Atleast 8 characters',met:checks.length}
        ].map((requirement, index)=>(
            <div className="requirement-item" key={index}>
            <span className={`check-icon ${requirement.met?'met':'not-met'}`}>
              {requirement.met && <Check width={12} height={12} />}
            </span>
            <span className={`requirement-text ${requirement.met?'met':''} `}> {requirement.text}</span>
          
          </div>
        ))
       
        }
      </div>
    </div>
  );
}

export default PasswordStrength;
