import React, { useEffect, useState } from "react";
import { ImageURL } from "../variable";
import SvgIcons from "../assets/svgs/symbol-defs.svg";

const LandingSlider = (props) => {
  const { list } = props;
  const [pre, setPre] = useState(0);
  const [cur, setCur] = useState(0);
  const [next, setNext] = useState(0);

  useEffect(()=>{
    const num = list.length;
    switch (num) {
      case 1:
        setPre(0);
        break;
      case 2:
        setPre(1);
        setNext(1);
        break;
      default:
        setCur(0);
        setPre(list.length - 1);
        setNext(1);
        break;
    }
  },[list])
  
  const Next = () => {
    if (cur >= 0 && cur < list.length - 2) {
      setPre(cur);
      setCur(cur + 1);
      setNext(next + 1);
    }
    if (cur === list.length - 2) {
      setPre(cur);
      setCur(cur + 1);
      setNext(0);
    }
    if (cur === list.length - 1) {
      setPre(list.length - 1);
      setCur(0);
      setNext(next + 1);
    }
  };
  const Pre = () => {
    if (cur === 0) {
      setNext(cur);
      setPre(list.length - 2);
      setCur(list.length - 1);
    }
    if (cur > 1 && cur <= list.length - 1) {
      setNext(cur);
      setPre(pre - 1);
      setCur(cur - 1);
    }
    if (cur === 1) {
      setPre(list.length - 1);
      setCur(cur - 1);
      setNext(next - 1);
    }
  };
  useEffect(() => {
    const autoPlay = 
      setInterval(()=>{
        if (cur >= 0 && cur < list.length - 2) {
          setPre(cur);
          setCur(cur + 1);
          setNext(next + 1);
        }
        if (cur === list.length - 2) {
          setPre(cur);
          setCur(cur + 1);
          setNext(0);
        }
        if (cur === list.length - 1) {
          setPre(list.length - 1);
          setCur(0);
          setNext(next + 1);
        }
      }, 3000);
    ;
    return () => clearInterval(autoPlay)
  }, [list,cur, next]);
  return (
    <div className={`landing-slider ${props.className}`}>
      <div className="landing-slider__container">
        {list.length > 0 &&
          list.map((el, index) => (
            <div
              key={el._id}
              className={`landing-slider__item ${
                pre === index && "preSlider"
              } ${cur === index && "curSlider"} ${
                next === index && "nextSlider"
              }`}
            >
              <img
                className={`landing-slider__img ${props.creator}`}
                src={`${ImageURL}api/${el.imagePreview}`}
                alt=""
              />
            </div>
          ))}
        <button
          className="landing-slider__button landing-slider__button-left"
          onClick={Pre}
        >
          <svg
            className={`landing-slider__button__icon landing-slider__button__${props.creator}`}
          >
            <use xlinkHref={`${SvgIcons}#icon-arrow-left`}></use>
          </svg>
        </button>
        <button
          className="landing-slider__button landing-slider__button-right"
          onClick={Next}
        >
          <svg
            className={`landing-slider__button__icon landing-slider__button__${props.creator}`}
          >
            <use xlinkHref={`${SvgIcons}#icon-arrow-right`}></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LandingSlider;
