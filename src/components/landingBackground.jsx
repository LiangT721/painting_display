import React from "react";
import SvgIcons from "../assets/svgs/symbol-defs.svg";
import logo from "../assets/imgs/Nora&Elaine.png";

const LandingBackground = () => {
  return (
    <div className="landing-background__bg">
      <img src={logo} className="landing-background__logo" alt="avater" />
      {
        // <svg className="landing-background landing-background-bird">
        //   <use xlinkHref={`${SvgIcons}#icon-bird`}></use>
        // </svg>
      }
      <svg className="landing-background landing-background-music">
        <use xlinkHref={`${SvgIcons}#icon-music`}></use>
      </svg>
      <svg className="landing-background landing-background-gift">
        <use xlinkHref={`${SvgIcons}#icon-gift`}></use>
      </svg>
      <svg className="landing-background landing-background-pencil">
        <use xlinkHref={`${SvgIcons}#icon-pencil`}></use>
      </svg>
      <svg className="landing-background landing-background-lollipop">
        <use xlinkHref={`${SvgIcons}#icon-lollipop`}></use>
      </svg>
      <svg className="landing-background landing-background-headphone">
        <use xlinkHref={`${SvgIcons}#icon-headphone`}></use>
      </svg>
      <svg className="landing-background landing-background-cassette">
        <use xlinkHref={`${SvgIcons}#icon-cassette`}></use>
      </svg>
      <svg className="landing-background landing-background-planet">
        <use xlinkHref={`${SvgIcons}#icon-planet`}></use>
      </svg>
      <svg className="landing-background landing-background-pen">
        <use xlinkHref={`${SvgIcons}#icon-pen`}></use>
      </svg>
      <svg className="landing-background landing-background-snowflake">
        <use xlinkHref={`${SvgIcons}#icon-snowflake`}></use>
      </svg>
      <svg className="landing-background landing-background-film">
        <use xlinkHref={`${SvgIcons}#film`}></use>
      </svg>
    </div>
  );
};

export default LandingBackground;
