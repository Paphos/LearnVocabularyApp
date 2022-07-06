import React from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useParams, Navigate } from "react-router-dom";

import './HomePage.scss';

const langFlagEmojis = {
  ko: <>&#127472;&#127479;</>,
  en: <>&#127468;&#127463;</>,
  fr: <>&#127467;&#127479;</>,
}

export function HomePage() {
  
  let { langCode } = useParams();

  if (langCode !== 'en' && langCode !== 'fr'){
    return (<Navigate to="/en" replace />);
  }

  return (
    <div style={{
      textAlign: 'center',
      marginTop: '35px'
    }}>
      <Link to={`./review?hidden=source`} className="btn-home btn-type1">
        <span>{langFlagEmojis.ko} <Arrow/> {langFlagEmojis[langCode]}</span>
      </Link>
      <Link to={`./review?hidden=target`} className="btn-home btn-type1">
        <span>{langFlagEmojis[langCode]} <Arrow/> {langFlagEmojis.ko}</span>
      </Link>
      <Link to={`./word-list`} className="btn-home btn-type2">
        <span>Word list</span>
      </Link>
    </div>
  );
}

function Arrow() {
  return (
    <ArrowRightIcon style={{ 
      margin: '0px 10px',
      transform: 'translateY(5px)'
     }}/>
  )
}
