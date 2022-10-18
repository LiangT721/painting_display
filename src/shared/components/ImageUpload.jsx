import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickerHandler = async (e) => {
    let file;
    if (e.target.files && e.target.files.length === 1) {
      file = e.target.files[0];

      setFile(file);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    props.imageUpload(file);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className={`image__upload ${props.className}`}>
      <input
        type="file"
        ref={filePickerRef}
        id={props.id}
        style={{ display: "none" }}
        accept="image/*"
        onChange={pickerHandler}
      />
      <div className="image__upload__container">
        <div className={`image__upload__preview image__upload__preview__${props.id}`}>
          {previewUrl && <img src={previewUrl} alt="preview" />}
        </div>
        <Button
          alarm={!isValid && props.alarm}
          type="button"
          onClick={pickImageHandler}
        >
          {previewUrl ? "Re-pick a painting " : "Click me to pick a painting"}
        </Button>
      </div>
    </div>
  );
};
export default ImageUpload;
