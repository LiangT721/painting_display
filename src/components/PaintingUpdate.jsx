import React, { useState, useContext } from "react";

import { category } from "../variable";
import { URL } from "../url";
import { useForm } from "../shared/hooks/useForm";
import { useHttpClient } from "../shared/hooks/http-hook";
import { authContext } from "../shared/hooks/Auth";
import { VALIDATOR_REQUIRE } from "../shared/util/validators";

import Button from "../shared/components/Button";
import Input from "../shared/components/Input";
import Text from "../shared/components/Text";

const PaintingUpdate = (props) => {
  const { painting, exitEdit, displayListUpdate, index } = props;
  const [invalidAlarm, setInvalidAlarm] = useState(false);
  const { authState } = useContext(authContext);
  const { sendRequest } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      name: {
        value: painting.name,
        isValid: true
      },
      category: {
        value: painting.category,
        isValid: false
      },
      content: {
        value: painting.content,
        isValid: false
      },
      key_word_1: {
        value: painting.key_word_1,
        isValid: true
      },
      key_word_2: {
        value: painting.key_word_2,
        isValid: true
      }
    },
    false
  );

  const paintingUpdateSubmitHandler = async (event) => {
    const data = {
      token: painting.token,
      userid: painting.user,
      id: painting._id,
      name: formState.inputs.name.value,
      category: formState.inputs.category.value,
      content: formState.inputs.content.value,
      key_word_1: formState.inputs.key_word_1.value,
      key_word_2: formState.inputs.key_word_2.value
    };
    if (formState.isValid) {
      event.preventDefault();
      try {
        const res = await sendRequest(
          `${URL}api/paintings`,
          "PATCH",
          JSON.stringify(data),
          { "Content-Type": "application/json" }
        );
        displayListUpdate(index, res.painting);
        exitEdit();
      } catch (err) {
       alert(err);
      }
    }
  };
  return (
    <div className="painting-update">
      <form action="#" className="form" onSubmit={paintingUpdateSubmitHandler}>
        <Text className="form__heading mb-sm">
          {["Painting update", "图片修改"]}
        </Text>
        <div className="update__creator">
          Creator :{" "}
          {authState.isLogin && (
            <Text className="ml-sm">{authState.userInfo.user}</Text>
          )}
        </div>
        <Input
          label="name"
          id="name"
          className="update__name"
          placeholder="name"
          initialValid={true}
          initialsValue={formState.inputs.name.value}
          onInput={inputHandler}
          validators={[VALIDATOR_REQUIRE()]}
          alarm={invalidAlarm}
        />
        <Input
          label="category"
          id="category"
          className="update__category"
          select={category}
          placeholder="category"
          onInput={inputHandler}
          initialValid={true}
          initialsValue={formState.inputs.category.value}
          validators={[VALIDATOR_REQUIRE()]}
          alarm={invalidAlarm}
        />
        <Input
          label="content"
          id="content"
          className="update__content"
          placeholder="content"
          initialValid={true}
          onInput={inputHandler}
          initialsValue={formState.inputs.content.value}
          validators={[VALIDATOR_REQUIRE()]}
          alarm={invalidAlarm}
        />
        <Input
          label="key word 1"
          id="key_word_1"
          className="update__key_word_1"
          placeholder="key word 1"
          onInput={inputHandler}
          initialsValue={formState.inputs.key_word_1.value}
          initialValid={true}
          validators={[]}
        />
        <Input
          label="key word 2"
          id="key_word_2"
          className="update__key_word_2"
          placeholder="key word 2"
          initialsValue={formState.inputs.key_word_2.value}
          onInput={inputHandler}
          initialValid={true}
          validators={[]}
        />
        <Button className="update__btn" type="submit">
          update
        </Button>
        <Button className="update__btn" onClick={exitEdit}>
          exit
        </Button>
      </form>
    </div>
  );
};
export default PaintingUpdate;
