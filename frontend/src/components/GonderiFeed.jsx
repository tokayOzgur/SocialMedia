import React, { useState, useEffect } from "react";
import { getGonderiler } from "../api/apiCalls";
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
  const pendingApiCall = useApiProgress("get", path);

  useEffect(() => {
    loadGonderiler();
  }, []);

  const loadGonderiler = async (page) => {
    try {
       const response = await getGonderiler(username, page);
      setGonderiPage((previousGonderiPage) => ({
        ...response.data,
        content: [...previousGonderiPage.content, ...response.data.content],
      }));
    } catch (error) {}
  };

  const { content, last, number } = gonderiPage;

  if (content.length === 0) {
    return (
      <div className="alert alert-secondary text-center">
        {pendingApiCall ? <Spinner /> : t("There are no posts")}
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
          style={{ cursor: pendingApiCall ? "not-allowed" : "pointer" }}
          onClick={pendingApiCall ? () => {} : () => loadGonderiler(number + 1)}
        >
          {pendingApiCall ? <Spinner /> : t("Load old posts")}
        </div>
      )}
    </div>
  );
};

export default GonderiFeed;
