import React, { useState, useEffect } from "react";
import { getGonderiler } from "../api/apiCalls";
import { useTranslation } from "react-i18next";
import GonderiView from "./GonderiView";

const GonderiFeed = () => {
  const [gonderiPage, setGonderiPage] = useState({ content: [], last: true });
  const { t } = useTranslation();

  useEffect(() => {
    const loadGonderiler = async () => {
      try {
        const response = await getGonderiler();
        setGonderiPage(response.data);
      } catch (error) {}
    };
    loadGonderiler();
  }, []);
  const { content, last } = gonderiPage;

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
        <div className="alert alert-secondary text-center">
          {t("Load old posts")}
        </div>
      )}
    </div>
  );
};

export default GonderiFeed;
