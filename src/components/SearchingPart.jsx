import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { category } from "../variable";
import { URL } from "../url";
import Text from "../shared/components/Text";
import { useHttpClient } from "../shared/hooks/http-hook";
import { languageContext } from "../shared/hooks/useLanguage";
import { useLoadOffSet } from "../shared/hooks/offSet";

const SearchingPart = (props) => {
  const { user } = useParams();
  const offset = useLoadOffSet();

  const uid = user.split("|")[1];
  const { sendRequest } = useHttpClient();
  const { lanState } = useContext(languageContext);
  const [keyWords, setKeyWords] = useState([]);
  const [condition, setCondition] = useState("");
  const [searchContent, setSearchContent] = useState("");

  const { setDisplayList, setIsDefaultList, isNora } = props;
  const eng = lanState.lan;
  const ref = useRef();

  const handleChange = (e) => {
    setCondition(e.target.value);
  };
  const search = async (el) => {
    console.log(el);
    setSearchContent(el);
    const content = el.replaceAll(" ", "%20");
    try {
      const res = await sendRequest(
        `${URL}api/paintings/search/${uid}^${content}`,
        "GET"
      );
      setDisplayList(res.paintingList);
      setIsDefaultList(false);
    } catch (err) {
      alert(err);
    }
  };

  const categorySearch = async (el) => {
    setCondition("");
    setSearchContent(el);
    const content = el.replaceAll(" ", "%20");
    try {
      const res = await sendRequest(
        `${URL}api/paintings/category/${uid}^${content}`,
        "GET"
      );
      setDisplayList(res.paintingList);
      setIsDefaultList(false);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const KeyWordres = await sendRequest(
          `${URL}api/paintings/keyword/${uid}`,
          "GET"
        );
        setKeyWords(KeyWordres.keywordList.slice(0, 8));
      } catch (err) {
        alert(err);
      }
    };
    fetchData();
  }, [sendRequest, uid]);
  console.log(searchContent);
  return (
    <div
      ref={ref}
      className={`painting-searching-part  ${props.className} ${
        offset > 100 && "painting-search__topStick"
      }`}
    >
      <div className={`painting__searchingbar ${
        offset > 150 && "painting-search__topStick__searchingbar"
      }`}>
        <input
          type="text"
          className="painting__searchinput"
          onChange={handleChange}
          value={condition}
          placeholder={eng ? "Search content" : "请输入您要搜索的内容"}
        />
        <button
          className={`button ${!isNora && "painting__btn__elaine"}`}
          onClick={() => search(condition)}
        >
          Search
        </button>
      </div>
      <div
        className={`painting__categorys ${
          offset > 200 && "painting-search__topStick__category"
        }`}
      >
        {category.map((el) => (
          <div
            className={`painting__category ${
              isNora && "painting__category__nora"
            } ${
              el === searchContent && !isNora && "painting__category__selected"
            } ${
              el === searchContent &&
              isNora &&
              "painting__category__nora__selected"
            }`}
            key={el}
            onClick={() => categorySearch(el)}
          >
            <Text>{el}</Text>
          </div>
        ))}
      </div>
      <div
        className={`painting__keywords ${
          offset > 250 && "painting-search__topStick__Keywords"
        }`}
      >
        {keyWords.length > 0 &&
          keyWords.map((el) => (
            <div
              className={`painting__keyword ${
                el._id === searchContent &&
                !isNora &&
                "painting__keyword__selected"
              } ${
                el._id === searchContent &&
                isNora &&
                "painting__keyword__nora__selected"
              }`}
              key={el._id}
              onClick={() => {
                setCondition("");
                search(el._id);
              }}
            >
              <Text>{el._id}</Text>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchingPart;
