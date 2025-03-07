import React from "react";

function Input({icon:Icon,...props}) {
  return (
      <div className="input-group">
        <Icon size={20} className="input-icon"/>
        <input {...props}/>
      </div>
  )
}

export default Input