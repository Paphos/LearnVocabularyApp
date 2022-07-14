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

  let otherLang = langCode === 'en' ? 'fr' : 'en';

  return (
    <>
      <div style={{
        marginTop: '5px'
      }}>
        <Line langCode={langCode} topicName={<>Objects &#128230;</>} topicId="objects" />
        <Line langCode={langCode} topicName={<>Places &#127969;</>} topicId="places" />
        <Line langCode={langCode} topicName={<>Jobs &#128104;&#8205;&#127859;</>} topicId="jobs" />
        <Line langCode={langCode} topicName={<>Verbs / Adjectives &#129336;</>} topicId="verbs" />
        <Line langCode={langCode} topicName={<>Adverbs / Connectors &#10160;</>} topicId="adverbs" />
        <Line langCode={langCode} topicName={<>Others &#128172;</>} topicId="others" />
      </div>
      <div style={{
        marginTop: '20px',
        textAlign: 'right'
      }}>
        <Link to={`/${otherLang}`} style={{ 
          margin: '10px',
          padding: '5px 15px',
          border: '1px #222 solid',
          borderRadius: '5px',
          fontSize: '25px',
        }}>
          <span>{langFlagEmojis[otherLang]}</span>
        </Link>
      </div>
    </>
  );
}

function Line({langCode, topicName, topicId}){
  return (
    <div  style={{
      textAlign: 'center',
    }}>
      <div className="topic-title">{topicName}</div>
      <div>
        <Link to={`./review?hidden=source&topicId=${topicId}`} className="btn-home btn-type1">
          <span>{langFlagEmojis.ko}<Arrow/>{langFlagEmojis[langCode]}</span>
        </Link>
        <Link to={`./review?hidden=target&topicId=${topicId}`} className="btn-home btn-type1">
          <span>{langFlagEmojis[langCode]}<Arrow/>{langFlagEmojis.ko}</span>
        </Link>
        <Link to={`./word-list?topicId=${topicId}`} className="btn-home btn-type2">
          <span>Word list</span>
        </Link>
      </div>
    </div>
    
  );
}

function Arrow() {
  return (
    <ArrowRightIcon style={{ 
      margin: '0px 2px',
      transform: 'translateY(5px)'
     }}/>
  )
}
