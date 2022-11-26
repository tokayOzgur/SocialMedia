import React, { useState, useEffect } from "react";
import { getGonderiler, getOldGonderiler } from "../api/apiCalls";
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
  const { t } = useTranslation();
  const { username } = useParams();

  const path = username
    ? `/api/1.0/users/${username}/gonderiler?page=`
    : "/api/1.0/gonderiler?page=";
  const initialGonderiLoadProgress = useApiProgress("get", path);

  let lastGonderiId = 0;
  if (gonderiPage.content.length > 0) {
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
      {content.map((gonderi) => {
        return <GonderiView key={gonderi.id} gonderi={gonderi} />;
      })}
      {!last && (
        <div
          className="alert alert-secondary text-center"
          style={{
            cursor: loadOldGonderilerProgress ? "not-allowed" : "pointer",
          }}
          onClick={
            loadOldGonderilerProgress ? () => {} : () => loadOldGonderiler()
          }
        >
          {loadOldGonderilerProgress ? <Spinner /> : t("Load old posts")}
        </div>
      )}
    </div>
  );
};

export default GonderiFeed;
