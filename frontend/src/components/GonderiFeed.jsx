import React, { useState, useEffect } from "react";
import { getGonderiler } from "../api/apiCalls";
import { useTranslation } from "react-i18next";
import GonderiView from "./GonderiView";

const GonderiFeed = () => {
  const [gonderiPage, setGonderiPage] = useState({
    content: [],
    last: true,
    number: 0,
  });
  const { t } = useTranslation();

  useEffect(() => {
    loadGonderiler();
  }, []);

  const loadGonderiler = async (page) => {
    try {
      const response = await getGonderiler(page);
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
        {t("There are no posts")}
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
          style={{ cursor: "pointer" }}
          onClick={() => loadGonderiler(number + 1)}
        >
          {t("Load old posts")}
        </div>
      )}
    </div>
  );
};

export default GonderiFeed;
