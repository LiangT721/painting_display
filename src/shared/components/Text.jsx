import React, { useContext, useEffect, useState } from "react";
import { languageContext } from "../hooks/useLanguage";

const Text = (props) => {
  const { lanState } = useContext(languageContext);
  const [displayContent, setDisplayConent] = useState(props.children);
  const eng = lanState.lan;

  useEffect(() => {
    if (typeof displayContent === "string" && displayContent.includes("|")) {
      setDisplayConent(displayContent.split("|"));
    }
  }, [displayContent]);

  return (
    <div className={`text ${props.className} ${props.textStyle}`} style={props.style}>
      {typeof displayContent === "string" ? (
        displayContent
      ) : eng ? (
        displayContent[0]
      ) : (
        <span className={props.ChiStyle}>{displayContent[1]}</span>
      )}
    </div>
  );
};

export default Text;
