import React from "react";
const Button = ({ buttonRef, icon, onclick, className }) => {
  return (
    <button ref={buttonRef} className={className} onClick={onclick}>
      <i className={icon}></i>
    </button>
  );
};

export default Button;
