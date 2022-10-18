import React, { useEffect, useContext, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./shared/hooks/useLanguage";
import { useHttpClient } from "./shared/hooks/http-hook";
import { useCookies } from "react-cookie";
import { authContext } from "./shared/hooks/Auth";
import { URL } from "./url";

import Home from "./pages/Home/Home";
import Upload from "./pages/Upload/Upload";
import UserInfo from "./pages/UserInfo/UserInfo";
import Temp from "./pages/Home/temp";
import UserPainting from "./pages/UserPainting/UserPainting";

import "./sass/App.scss";

function App() {
  const { sendRequest } = useHttpClient();
  const [cookies, removeCookie] = useCookies(["token"]);
  const token = cookies.token;
  const { authState, dispatch } = useContext(authContext);

  const checkLogin = useCallback(
    async (token) => {
      try {
        const res = await sendRequest(
          `${URL}api/users/auth`,
          "POST",
          JSON.stringify({ token }),
          { "Content-Type": "application/json" }
        );
        if (res.loginInfo) {
          dispatch({
            type: "LOGIN",
            value: {
              token: token,
              userInfo: res.loginInfo
            }
          });
        } else {
          removeCookie("token");
        }
      } catch (err) {}
    },
    [dispatch, sendRequest, removeCookie]
  );

  useEffect(() => {
    if (token && !authState.isLogin) {
      checkLogin(token);
    }
  }, [authState.isLogin, checkLogin, token]);

  return (
    <div className="App">
      <LanguageProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/temp" element={<Temp />} />
          <Route path="/user/:user" element={<UserPainting />} />
        </Routes>
      </LanguageProvider>
    </div>
  );
}

export default App;
