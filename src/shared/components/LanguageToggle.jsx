import React, { useContext} from "react";
import { languageContext } from "../hooks/useLanguage";

const LanguageToggle = (props) => {
  const { lanState, dispatch } = useContext(languageContext);
  return(
    <div className={`language-toggle ${props.className}`}>
      <button className="button language-toggle__btn" onClick={()=>dispatch({
        type:"LAN_TOGGLE"
      })} >{ lanState.lan? "English" : "中文"} &#10095; { lanState.lan? "中文" : "English"}</button>
    </div>
  )
}

export default LanguageToggle;