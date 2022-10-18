import React, { useCallback, useEffect, useState } from "react";
import { useHttpClient } from "../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";

import nora from "../assets/imgs/nora_portait.png";
import elaine from "../assets/imgs/elaine_portait.png";
import arrow from "../assets/imgs/arrow.png";
import { userBackup } from "../variable";
import { URL } from "../url";

import LandingSlider from "./LandingSlider";
import LanguageToggle from "../shared/components/LanguageToggle";
import Text from "../shared/components/Text";
import LandingBackground from "./landingBackground";

const LandingGallery = () => {
  const navigate = useNavigate();
  const { sendRequest } = useHttpClient();
  const [noralist, setNoraList] = useState([]);
  const [elainelist, setElaineList] = useState([]);
  const [users, setUsers] = useState(userBackup);
  const link = ["Click me for more", "更多画作"];

  const fetchPaintingsList = useCallback(async () => {
    try {
      const res = await sendRequest(`${URL}api/paintings`, "GET");
      const userRes = await sendRequest(`${URL}api/users`, "GET");
      userRes.users.length > 0 && setUsers(userRes.users);
      res.lists.nora && setNoraList(res.lists.nora);
      res.lists.elaine && setElaineList(res.lists.elaine);
    } catch (err) {
      alert(err);
    }
  }, [sendRequest, setNoraList, setElaineList, setUsers]);

  useEffect(() => {
    fetchPaintingsList();
  }, [fetchPaintingsList]);
  console.log(users)
  return (
    <div className="landing-gallery">
      <LanguageToggle className="landing-gallery__toggle" />
      <LandingBackground />
      <div className="landing-gallery__contents">
        <div className="landing-gallery__elaine">
          <div className="landing-gallery__elaine__intro">
            <Text
              className="landing-gallery__elaine__title"
              ChiStyle={"landing-gallery__title-chi"}
            >
              {users[1].name}
            </Text>
            <div className="landing-gallery__elaine__link">
              <Text className="landing-gallery__elaine__link-text">{link}</Text>
              <img
                src={arrow}
                alt=""
                className="landing-gallery__elaine__link-arrow"
              />
              <img
                src={elaine}
                className="landing-gallery__elaine__link-img"
                alt="avater"
                onClick={() =>
                  navigate(`/user/${users[1].username}|${users[1]._id}`)
                }
              />
            </div>
            <div className="landing-gallery__elaine__text">
              <Text>{users[1].intro}</Text>
            </div>
          </div>
          <LandingSlider
            className="landing-gallery__elaine__slider"
            list={elainelist}
            creator="elaine"
          />
        </div>
        {
          <div className="landing-gallery__nora">
            <LandingSlider
              className="landing-gallery__nora__slider"
              list={noralist}
              creator="nora"
            />
            <div className="landing-gallery__nora__intro">
              <div className="landing-gallery__nora__text">
                <Text>{users[0].intro}</Text>
              </div>
              <div className="landing-gallery__nora__link">
                <Text className="landing-gallery__nora__link-text">{link}</Text>
                <img
                  src={arrow}
                  alt=""
                  className="landing-gallery__nora__link-arrow"
                />
                <img
                  src={nora}
                  className="landing-gallery__nora__link-img"
                  alt="avater"
                  onClick={() =>
                    navigate(`/user/${users[0].username}|${users[0]._id}`)
                  }
                />
              </div>
              <Text
                className="landing-gallery__nora__title"
                ChiStyle={"landing-gallery__title-chi"}
              >
                {users[0].name}
              </Text>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default LandingGallery;
