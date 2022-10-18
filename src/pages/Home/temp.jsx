import React, { useCallback, useEffect, useState} from "react";

import { Link } from "react-router-dom";

import { URL } from "../../url";
import { ImageURL } from "../../variable";
import { useHttpClient } from "../../shared/hooks/http-hook";

import Text from "../../shared/components/Text";
import LanguageToggle from "../../shared/components/LanguageToggle";

const Temp = () => {
  const { sendRequest } = useHttpClient();
  const [noralist, setNoraList] = useState([]);
  const [elainelist, setElaineList] = useState([]);
  const [users, setUsers] = useState({});

  const fetchPaintingsList = useCallback(async () => {
    try {
      const res = await sendRequest(`${URL}api/paintings`, "GET");
      setNoraList(res.lists.nora);
      setElaineList(res.lists.elaine);
      const user_res = await sendRequest(`${URL}api/users`, "GET");
      const userlist = {
        nora: user_res.users[0],
        elaine: user_res.users[1]
      };
      setUsers(userlist);
    } catch (err) {
      alert(err);
    }
  }, [sendRequest, setNoraList, setElaineList]);
  useEffect(() => {
    fetchPaintingsList();
  }, [fetchPaintingsList]);
  return (
    <div className="temp">
      <p className="temp__heading">Painting</p>
      <LanguageToggle />
      <div className="page-links">
        <Link to="/" className="button">
          home
        </Link>
        <Link to="/upload" className="button">
          upload
        </Link>
        <Link to="/userinfo" className="button">
          user information
        </Link>
      </div>
      <div className="temp__gallery">
        <div className="temp__nora__gallery">
          <div className="temp__nora__gallery__creator">
            <Text>{["Nora", "汤一诺"]}</Text>
            {users.nora && (
              <div className="temp__nora__gallery__icon">
                <img src={`${ImageURL}api/${users.nora.icon}`} alt="" />
              </div>
            )}
          </div>
          {noralist &&
            noralist.length > 0 &&
            noralist.map((el) => (
              <div className="temp__nora__gallery__item" key={el._id}>
                <div className="temp__nora__gallery__image">
                  <img src={`${ImageURL}api/${el.imagePreview}`} alt="" />
                </div>
                <Text className="temp__nora__gallery__name">{el.name}</Text>
                <div className="temp__nora__gallery__info">
                  <Text>{el.category}</Text>
                  <Text>{el.content}</Text>
                  <Text>{el.created_date}</Text>
                </div>
              </div>
            ))}
        </div>
        <div className="temp__elaine__gallery">
          <div className="temp__elaine__gallery__creator">
            <Text>{["Elaine", "汤一冉"]}</Text>
            {users.elaine && (
              <div className="temp__elaine__gallery__icon">
                <img src={`${ImageURL}api/${users.elaine.icon}`} alt="" />
              </div>
            )}
          </div>
          {elainelist &&
            elainelist.length > 0 &&
            elainelist.map((el) => (
              <div className="temp__elaine__gallery__item" key={el._id}>
                <div className="temp__elaine__gallery__image">
                  <img src={`${ImageURL}api/${el.imagePreview}`} alt="" />
                </div>
                <Text className="temp__nora__gallery__name">{el.name}</Text>
                <div className="temp__elaine__gallery__info">
                  <Text>{el.category}</Text>
                  <Text>{el.content}</Text>
                  <Text>{el.created_date}</Text>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Temp;
