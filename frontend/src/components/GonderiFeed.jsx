import React, { useState, useEffect } from 'react';
import { getGonderiler } from '../api/apiCalls';
import { useTranslation } from 'react-i18next';

const GonderiFeed = () => {
  const [gonderiPage, setGonderiPage] = useState({ content: [] });
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
  if (gonderiPage.content.length === 0) {
    return <div className="alert alert-secondary text-center">{t('There are no posts')}</div>;
  }

  return <div></div>;
};

export default GonderiFeed;