import React, { useRef, useCallback, useState } from "react";
import PopUpGB from "../shared/components/PopUpBG";
import PaintingSlider from "./PaintSlider";

import { ImageURL } from "../variable";

const PaintingList = (props) => {
  const { list, loading, hasMore, setSkipNum, isDefaultList,displayListUpdate,displayListdelete } = props;
  const [isSlider, setIsSlider] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const observer = useRef();
  const lastRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && isDefaultList) {
          setSkipNum((prevSkipNum) => prevSkipNum + 15);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, isDefaultList, setSkipNum]
  );

  const selectImage = (index) => {
    setStartIndex(index);
    setIsSlider(true);
  };
  const cancelImage = () => {
    setStartIndex(0);
    setIsSlider(false);
  };
  return (
    <div className="painting-list">
      {isSlider && (
        <PopUpGB>
            <PaintingSlider
              list={list}
              startIndex={startIndex}
              cancelImage={cancelImage}
              displayListUpdate={displayListUpdate}
              displayListdelete={displayListdelete}
            />
        </PopUpGB>
      )}
      {list.length > 0 &&
        list.map((el, index) => {
          if (list.length === index + 1) {
            return (
              <img
                ref={lastRef}
                className="painting-list__img"
                src={`${ImageURL}api/${el.imagePreview}`}
                alt=""
                key={el._id}
                onClick={() => {
                  selectImage(index);
                }}
              />
            );
          } else {
            return (
              <img
                className="painting-list__img"
                src={`${ImageURL}api/${el.imagePreview}`}
                alt=""
                key={el._id}
                onClick={() => {
                  selectImage(index);
                }}
              />
            );
          }
        })}
    </div>
  );
};

export default PaintingList;
