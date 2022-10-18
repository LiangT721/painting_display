import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { category } from "../../variable";
import { URL } from "../../url";
import { useResizer } from "../../shared/hooks/useResizer";
import { useForm } from "../../shared/hooks/useForm";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { authContext } from "../../shared/hooks/Auth";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

import Button from "../../shared/components/Button";
import ImageUpload from "../../shared/components/ImageUpload";
import Input from "../../shared/components/Input";
import LanguageToggle from "../../shared/components/LanguageToggle";
import Text from "../../shared/components/Text";

const Upload = () => {
  const [invalidAlarm, setInvalidAlarm] = useState(false);
  const [isUpload, setIsupload] = useState(false);
  const navigate = useNavigate();
  const { authState } = useContext(authContext);
  const [formState, inputHandler] = useForm(
    {
      id: {
        value: "",
        isValid: false
      },
      name: {
        value: "",
        isValid: true
      },
      created_date: {
        value: "",
        isValid: false
      },
      category: {
        value: "",
        isValid: false
      },
      content: {
        value: "",
        isValid: false
      },
      key_word_1: {
        value: "",
        isValid: true
      },
      key_word_2: {
        value: "",
        isValid: true
      },

      image: {
        value: null,
        isValid: false
      },
      imagePreview: {
        value: null,
        inValid: false
      }
    },
    false
  );

  useEffect(() => {
    if (authState.isLogin) {
      inputHandler("id", authState.userInfo.user_id, true);
    }
  }, [authState, inputHandler, navigate]);

  const [imageCompress] = useResizer();

  const { sendRequest } = useHttpClient();

  const paintingUploadSubmitHandler = async (event) => {
    if (formState.isValid) {
      event.preventDefault();
      setIsupload(true);
      try {
        const formData = new FormData();
        formData.append("id", formState.inputs.id.value);
        formData.append("name", formState.inputs.name.value);
        formData.append("created_date", formState.inputs.created_date.value);
        formData.append("category", formState.inputs.category.value);
        formData.append("content", formState.inputs.content.value);
        formData.append("key_word_1", formState.inputs.key_word_1.value);
        formData.append("key_word_2", formState.inputs.key_word_2.value);
        formData.append("image", formState.inputs.image.value);
        formData.append("imagePreview", formState.inputs.imagePreview.value);
        formData.append("token", authState.token);
        await sendRequest(`${URL}api/paintings`, "POST", formData);
        reset();
        setIsupload(false);
        navigate("/");
      } catch (error) {
        alert(error);
      }
    } else {
      setInvalidAlarm(true);
    }
  };

  const imageUpload = async (file) => {
    const imagefile = await imageCompress(file, 1, 1920, false);
    const previewImagefile = await imageCompress(file, 0.2, 500, false);

    inputHandler("image", imagefile, true);
    inputHandler("imagePreview", previewImagefile, true);
  };

  const reset = () => {
    inputHandler("created_date", "", false);
    inputHandler("content", "", false);
    inputHandler("key_word_1", "", true);
    inputHandler("key_word_2", "", true);
    inputHandler("key_word_3", "", true);
    inputHandler("image", null, false);
    inputHandler("imagePreview", null, false);
  };

  return (
    <div className="upload">
      <div className="upload__container">
        <LanguageToggle className="upload__language-toggle" />
        {authState.isLogin && (
          <div className="login__greeting">
            Hi, <Text className="ml-sm">{authState.userInfo.user}</Text>
          </div>
        )}
        <form
          action="#"
          className="form"
          onSubmit={paintingUploadSubmitHandler}
        >
          <Text className="form__heading mb-sm">
            {["Painting Upload", "图片上传"]}
          </Text>
          <div className="upload__creator">
            Creator :{" "}
            {authState.isLogin && (
              <Text className="ml-sm">{authState.userInfo.user}</Text>
            )}
          </div>
          <Input
            label="name"
            id="name"
            className="upload__name"
            placeholder="name"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            alarm={invalidAlarm}
          />
          <Input
            label="created date"
            id="created_date"
            placeholder="created date"
            type="date"

            className="upload__created_date"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            alarm={invalidAlarm}
          />
          <Input
            label="category"
            id="category"
            className="upload__category"
            select={category}
            placeholder="category"
            onInput={inputHandler}
            initialValid={true}
            initialsValue={category[0]}
            validators={[VALIDATOR_REQUIRE()]}
            alarm={invalidAlarm}
          />
          <Input
            label="content"
            id="content"
            className="upload__content"
            placeholder="content"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            alarm={invalidAlarm}
          />
          <Input
            label="key word 1"
            id="key_word_1"
            className="upload__key_word_1"
            placeholder="key word 1"
            onInput={inputHandler}
            initialValid={true}
            validators={[]}
          />
          <Input
            label="key word 2"
            id="key_word_2"
            className="upload__key_word_2"
            placeholder="key word 2"
            onInput={inputHandler}
            initialValid={true}
            validators={[]}
          />

          <ImageUpload
            className="upload__image"
            id="image"
            imageUpload={imageUpload}
            alarm={invalidAlarm}
          />
          <Button className="upload__btn" type="submit">
            Upload
          </Button>
        </form>
        <div className="upload__bottom__btns">
          <Link to="/" className="page-link upload__link mr-sm">
            &#10141; <u>home</u>{" "}
          </Link>
          <Link to="/userinfo" className="page-link upload__link">
            &#10141; <u>login</u>{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Upload;
