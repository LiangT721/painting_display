import React, { useEffect, useState, useContext, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useCookies } from "react-cookie";

import { URL } from "../../url";
import { authContext } from "../../shared/hooks/Auth";
import Nora from "../../assets/imgs/nora_portait.png";
import Elaine from "../../assets/imgs/elaine_portait.png";
import PaintingList from "../../components/PaintingList";
import SearchingPart from "../../components/SearchingPart";
import Text from "../../shared/components/Text";

const UserPainting = () => {
  const { sendRequest } = useHttpClient();
  const { authState, dispatch } = useContext(authContext);
  const [, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const [skipNum, setSkipNum] = useState(0);
  const [defaultList, setDefaultList] = useState([]);
  const [isDefaultList, setIsDefaultList] = useState(true);
  const [displayList, setDisplayList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { user } = useParams();
  const uid = user.split("|")[1];
  const isNora = user.split("|")[0] === "nora";

  const fetchData = useCallback(async (skipNum) => {
    try {
      const res = await sendRequest(
        `${URL}api/paintings/${uid}^${skipNum}`,
        "GET"
      );
      setDisplayList((preDisplayList) => {
        return [...preDisplayList, ...res.paintingList];
      });
      setDefaultList((preDefaultList) => {
        return [...preDefaultList, ...res.paintingList];
      });
      setLoading(false);
      setHasMore(res.paintingList.length > 0);
    } catch (err) {
      alert(err);
    }
  }, [sendRequest, uid]);

  const resetDisplay = () => {
    setDisplayList(defaultList);
    setIsDefaultList(true);
  };

  const displayListUpdate = (index, painting) => {
    const list = displayList;
    list[index] = painting;
    setDisplayList(list);
  };

  const displayListdelete = (index) => {
    const list = displayList;
    list.splice(index, 1);
    setDisplayList(list);
  };

  const logout = () => {
    removeCookie("token");
    dispatch({
      type: "LOGOUT"
    });
    navigate("/userinfo");
  };

  useEffect(() => {
    setLoading(true);
    fetchData(skipNum);
  }, [skipNum, fetchData]);
  return (
    <div className={`user-painting ${isNora && "user-painting__norabg"}`}>
      <div className="user-painting__menu">
        {authState.isLogin ? (
          <div className="user-painting__greeting">
            Hi &nbsp;
            <Text>{authState.userInfo.user}</Text>,
          </div>
        ) : (
          <div></div>
        )}
        <div className="user-painting__link">
          <Link to="/" className="page-link user-painting__link-button">
            <Text textStyle={"underline"}>{["Home", "主页"]}</Text>
          </Link>
          {authState.isLogin && (
            <Link to="/upload" className="page-link user-painting__link-button">
              <Text textStyle={"underline"}>{["upload", "上传"]}</Text>
            </Link>
          )}
          {authState.isLogin ? (
            <div
              to="/userinfo"
              className="page-link user-painting__link-button"
              onClick={logout}
            >
              <Text textStyle={"underline"}>{["Logout", "登出"]}</Text>
            </div>
          ) : (
            <Link
              to="/userinfo"
              className="page-link user-painting__link-button"
            >
              <Text textStyle={"underline"}>{["login", "登录"]}</Text>
            </Link>
          )}
        </div>
      </div>
      <div className="user-painting__title" onClick={resetDisplay}>
        {isNora && <img className="user-painting__img" src={Nora} alt="icon" />}
        {isNora && (
          <Text
            className="user-painting__title__text"
            ChiStyle={"user-painting__title__text-chi"}
          >
            {["Nora", "汤一诺"]}
          </Text>
        )}
        {!isNora && (
          <img className="user-painting__img" src={Elaine} alt="icon" />
        )}
        {!isNora && (
          <Text
            className="user-painting__title__text"
            ChiStyle={"user-painting__title__text-chi"}
          >
            {["Elaine", "汤一冉"]}
          </Text>
        )}
      </div>
      <SearchingPart
        className="user-painting__searching"
        isNora={isNora}
        setDisplayList={setDisplayList}
        setIsDefaultList={setIsDefaultList}
      />
      {!isDefaultList && (<div className="user-painting__reset" onClick={resetDisplay}>
      <span>&#10149; </span><Text>{['All paintings','所有作品']}</Text>
      </div>)}
      {displayList.length > 0 && (
        <PaintingList
          list={displayList}
          loading={loading}
          hasMore={hasMore}
          setSkipNum={setSkipNum}
          isDefaultList={isDefaultList}
          displayListUpdate={displayListUpdate}
          displayListdelete={displayListdelete}
        />
      )}
      <div className="user-painting__loading">
        {loading ? (
          <div className="lds-ripple">
            <div></div>
            <div></div>
          </div>
        ) : (
          <p className="user-painting__loading-text">No more painting</p>
        )}
      </div>
    </div>
  );
};

export default UserPainting;
