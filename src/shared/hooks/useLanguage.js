import React, { useReducer } from "react";

const languageContext = React.createContext();

const languageReducer = (state, action) => {
  switch (action.type) {
    case "LAN_TOGGLE":
      const preLan = state.lan;
      return {
        ...state,
        lan: !preLan
      };
    default:
      return state;
  }
};

const LanguageProvider = (props) => {
  const [lanState, dispatch] = useReducer(languageReducer, {
    lan: true
  });

  // const toggleHandler = () => {
  //   dispatch({
  //     type:"LAN_TOGGLE"
  //   })
  // }

  return (
    <languageContext.Provider value={{ lanState, dispatch }}>
      {props.children}
    </languageContext.Provider>
  );
};

export { languageContext, LanguageProvider };
