import React from "react";
import { Link } from "react-router-dom";

const Button = (props) => {
  if (props.href) {
    return <a href="{props.href}">{props.children}</a>;
  };
  if (props.to) {
    return (
      <Link
       to={props.to}
       exact={props.exact}>
       {props.children}
       </Link>
    )
  }
  return(
    <button
      className={`button ${props.className} ${props.alarm && "button__alarm"} `}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disable}
    >
      {props.children}
    </button>
  )
};

export default Button;