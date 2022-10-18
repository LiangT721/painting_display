import React from "react";
import ReactDOM from 'react-dom';


const PopUp = (props) => {
  return ReactDOM.createPortal(
    <div className="pop-up" onClick={props.onClick}>
    {props.children}
    </div>,
    document.getElementById("backdrop-hook")
  );
}

export default PopUp;