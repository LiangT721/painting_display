import React from "react";
import ReactDOM from 'react-dom';


const PopUpBG = (props) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}>
    {props.children}
    </div>,
    document.getElementById("PopUp-hook")
  );
}

export default PopUpBG;