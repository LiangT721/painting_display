import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { URL } from "../url";
import { VALIDATOR_REQUIRE } from "../shared/util/validators";
import { useForm } from "../shared/hooks/useForm";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useResizer } from "../shared/hooks/useResizer";
import { useCookies } from "react-cookie";
import { authContext } from "../shared/hooks/Auth";

import ImageUpload from "../shared/components/ImageUpload";
import Button from "../shared/components/Button";
import Input from "../shared/components/Input";
import Text from "../shared/components/Text";

const UserSignUp = (props) => {
  const [invalidAlarm, setInvalidAlarm] = useState(false);
  const [, setCookie] = useCookies(["token"]);
  const { sendRequest } = useHttpClient();
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);

  const [formState, inputHandler] = useForm(
    {
      creator: {
        value: "",
        isValid: false
      },
      username: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      },
      birth: {
        value: "",
        isValid: false
      },
      icon: {
        value: "",
        isValid: false
      },
      intro: {
        value: "",
        isValid: true
      }
    },
    false
  );
  const [imageCompress] = useResizer();
  const { closePopUp } = props;

  const userSubmitHandler = async (event) => {
    if (formState.isValid) {
      event.preventDefault();
      try {
        const formData = new FormData();
        formData.append("creator", formState.inputs.creator.value);
        formData.append("username", formState.inputs.username.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("birth", formState.inputs.birth.value);
        formData.append("icon", formState.inputs.icon.value);
        formData.append("intro", formState.inputs.intro.value);
        const res = await sendRequest(
          `${URL}api/users/signup`,
          "POST",
          formData
        );
        setCookie("token", res.loginInfo.token);
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

  const imageUpload = async (file) => {
    const imagefile = await imageCompress(file, 0.5, 400, false);
    inputHandler("icon", imagefile, true);
  };
  
  return (
    <div className={`signUp__container ${props.className}`}>
      <form
        action="#"
        className="form user-info__signUp"
        onSubmit={userSubmitHandler}
      >
        <Text className="form__heading mb-sm">
          {["Creator Sign Up", "注册新作者"]}
        </Text>
        <Input
          className="user-info__username"
          label="username"
          id="username"
          placeholder="username"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          alarm={invalidAlarm}
        />
        <Input
          className="user-info__password"
          label="password"
          id="password"
          placeholder="password"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          alarm={invalidAlarm}
        />
        <Input
          className="user-info__creator"
          label="creator"
          id="creator"
          placeholder="Creator"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          alarm={invalidAlarm}
        />
        <Input
          className="user-info__birth"
          label="birth"
          id="birth"
          placeholder="2022-02-12"
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          alarm={invalidAlarm}
        />
        <Input
          className="user-info__intro"
          textarea
          label="intro"
          id="intro"
          placeholder="introduction"
          initialValid={true}
          onInput={inputHandler}
          validators={[]}
        />
        <ImageUpload
          className="user-info__image"
          id="icon"
          imageUpload={imageUpload}
          alarm={invalidAlarm}
        />
        <Button className="user-info__btn" type="submit">
          submit
        </Button>
      </form>
      <div className="form__bottom__btns">
        <p className="page-link" onClick={closePopUp}>
          &#10141; <u>Login</u>{" "}
        </p>
      </div>
    </div>
  );
};

export default UserSignUp;
