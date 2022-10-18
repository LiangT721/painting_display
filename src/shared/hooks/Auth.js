import React, { useReducer } from "react";

const authContext = React.createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLogin: true,
        token: action.value.token,
        userInfo: action.value.userInfo
      };
    case "LOGOUT":
      return {
        ...state,
        isLogin: false,
        token: "",
        userInfo: {}
      };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [authState, dispatch] = useReducer(authReducer, {
    isLogin: false,
    token: "",
    userInfo: {}
  });

  return (
    <authContext.Provider value={{ authState, dispatch }}>
      {props.children}
    </authContext.Provider>
  );
};

export { authContext, AuthProvider };
