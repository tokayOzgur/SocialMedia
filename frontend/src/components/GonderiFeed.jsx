import React, { useState, useEffect } from "react";
import {
  getGonderiler,
  getOldGonderiler,
  getNewGonderiCount,
  getNewGonderiler,
} from "../api/apiCalls";
import { useTranslation } from "react-i18next";
import GonderiView from "./GonderiView";
import { useApiProgress } from "../shared/ApiProgress";
import Spinner from "./Spinner";
import { useParams } from "react-router-dom";

const GonderiFeed = () => {
  const [gonderiPage, setGonderiPage] = useState({
    content: [],
    last: true,
    number: 0,
  });
  const [newGonderiCount, setNewGonderiCount] = useState(0);
  const { t } = useTranslation();
  const { username } = useParams();

  const path = username
    ? `/api/1.0/users/${username}/gonderiler?page=`
    : "/api/1.0/gonderiler?page=";
  const initialGonderiLoadProgress = useApiProgress("get", path);

  let lastGonderiId = 0;
  let firstGonderiId = 0;
  if (gonderiPage.content.length > 0) {
    firstGonderiId = gonderiPage.content[0].id;

    const lastGonderiIndex = gonderiPage.content.length - 1;
    lastGonderiId = gonderiPage.content[lastGonderiIndex].id;
  }

  const oldGonderilerPath = username
    ? `/api/1.0/users/${username}/gonderiler/${lastGonderiId}`
    : `/api/1.0/gonderiler/${lastGonderiId}`;

  const loadOldGonderilerProgress = useApiProgress(
    "get",
    oldGonderilerPath,
    true
  );

  const newGonderiPath = username
    ? `/api/1.0/users/${username}/gonderileri/${firstGonderiId}?direction=after`
    : `/api/1.0/gonderiler/${firstGonderiId}?direction=after`;

  const loadNewGonderilerProgress = useApiProgress("get", newGonderiPath, true);

  useEffect(() => {
    const getCount = async () => {
      const response = await getNewGonderiCount(firstGonderiId, username);
      setNewGonderiCount(response.data.count);
    };
    let looper = setInterval(getCount, 5000);
    return function cleanup() {
      clearInterval(looper);
    };
  }, [firstGonderiId, username]);
  useEffect(() => {
    const loadGonderiler = async (page) => {
      try {
        const response = await getGonderiler(username, page);
        setGonderiPage((previousGonderiPage) => ({
          ...response.data,
          content: [...previousGonderiPage.content, ...response.data.content],
        }));
      } catch (error) {}
    };
    loadGonderiler();
  }, [username]);

  const loadOldGonderiler = async () => {
    const response = await getOldGonderiler(lastGonderiId, username);
    setGonderiPage((previousGonderiPage) => ({
      ...response.data,
      content: [...previousGonderiPage.content, ...response.data.content],
    }));
  };

  const loadNewGonderiler = async () => {
    const response = await getNewGonderiler(firstGonderiId, username);
    setGonderiPage((previousGonderiPage) => ({
      ...previousGonderiPage,
      content: [...response.data, ...previousGonderiPage.content],
    }));
    setNewGonderiCount(0);
  };

  const { content, last } = gonderiPage;

  if (content.length === 0) {
    return (
      <div className="alert alert-secondary text-center">
        {initialGonderiLoadProgress ? <Spinner /> : t("There are no posts")}
      </div>
    );
  }

  return (
    <div>
      {newGonderiCount > 0 && (
        <div
          className="alert alert-secondary text-center mb-1"
          style={{
            cursor: loadNewGonderilerProgress ? "not-allowed" : "pointer",
          }}
          onClick={loadNewGonderilerProgress ? () => {} : loadNewGonderiler}
        >
          {loadNewGonderilerProgress ? <Spinner /> : t("There are new posts")}
        </div>
      )}
      {content.map((gonderi) => {
        return <GonderiView key={gonderi.id} gonderi={gonderi} />;
      })}
      {!last && (
        <div
          className="alert alert-secondary text-center"
          style={{
            cursor: loadOldGonderilerProgress ? "not-allowed" : "pointer",
          }}
          onClick={loadOldGonderilerProgress ? () => {} : loadOldGonderiler}
        >
          {loadOldGonderilerProgress ? <Spinner /> : t("Load old posts")}
        </div>
      )}
    </div>
  );
};

export default GonderiFeed;
