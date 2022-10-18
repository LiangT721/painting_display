import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/useForm";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useCookies } from "react-cookie";
import { authContext } from "../../shared/hooks/Auth";
import { URL } from "../../url";

import Button from "../../shared/components/Button";
import Input from "../../shared/components/Input";
import Text from "../../shared/components/Text";
import LanguageToggle from "../../shared/components/LanguageToggle";
import UserSignUp from "../../components/UserSignUp";
import PopUpBG from "../../shared/components/PopUpBG";

const UserInfo = () => {
  const [invalidAlarm, setInvalidAlarm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [, setCookie, removeCookie] = useCookies(["token"]);
  const { sendRequest } = useHttpClient();
  const navigate = useNavigate();
  const { authState, dispatch } = useContext(authContext);

  const [formState, inputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      }
    },
    false
  );

  const loginHandler = async (event) => {
    if (formState.isValid) {
      event.preventDefault();
      try {
        const res = await sendRequest(
          `${URL}api/users/login`,
          "POST",
          JSON.stringify({
            username: formState.inputs.username.value,
            password: formState.inputs.password.value
          }),
          { "Content-Type": "application/json" }
        );

        const now = new Date();
        const time = now.getTime();
        const expireTime = time + 60 * 60 * 1000;
        setCookie("token", res.loginInfo.token, expireTime);
        dispatch({
          type: "LOGIN",
          value: {
            token: res.loginInfo.token,
            userInfo: res.loginInfo
          }
        });
        navigate("/upload");
      } catch (error) {
        alert(error);
      }
    } else {
      setInvalidAlarm(true);
    }
  };

  const logout = () => {
    removeCookie("token");
    dispatch({
      type: "LOGOUT"
    });
  };

  return (
    <div className="user-info">
      {!isLogin && <PopUpBG />}
      <UserSignUp
        className={`${!isLogin && "signUp__container__enter"}`}
        closePopUp={() => setIsLogin(true)}
      />
      <div className="user-info__container">
        <div className="user-info__top">
          {authState.isLogin && (
            <div className="user-info__greeting">
              Hi &nbsp;
              <Text>{authState.userInfo.user}</Text>,
            </div>
          )}
          <LanguageToggle className="user-info__language-toggle" />
        </div>
        <form action="#" className="form login__form" onSubmit={loginHandler}>
          <Text className="form__heading mb-sm">{["Login", "登录"]}</Text>
          <Input
            className="login__username"
            label="username"
            id="username"
            placeholder="username"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            alarm={invalidAlarm}
          />
          <Input
            className="login__password"
            label="password"
            id="password"
            type="password"
            placeholder="password"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            alarm={invalidAlarm}
          />
          <Button className="button login__btn" type="submit">
            submit
          </Button>
        </form>
        <div className="bottom__btns">
          <Link to="/" className="button">
            home
          </Link>
          {
            // <div
            //   className="page-link sign-up__btn"
            //   onClick={() => setIsLogin(false)}
            // >
            //   &#10141; <u>Sign up</u>
            // </div>
          }
          {authState.isLogin && (
            <Link to="/upload" className="page-link sign-up__btn">
              &#10141; <u>upload</u>
            </Link>
          )}
          {authState.isLogin && (
            <p className="page-link sign-up__btn" onClick={logout}>
              &#10141; <u>logout</u>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
