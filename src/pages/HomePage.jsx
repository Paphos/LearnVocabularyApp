import React from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link } from "react-router-dom";

import './HomePage.scss';

export function HomePage() {
  
  return (
    <div style={{
      textAlign: 'center',
      marginTop: '35px'
    }}>
      <Link to={`/review?source=ko&target=en`} className="btn-type1">
        <span>한국어 (&#127472;&#127479;) <Arrow/> ___ (&#127468;&#127463;)</span>
      </Link>
      <Link to={`/review?source=en&target=ko`} className="btn-type1">
        <span>English (&#127468;&#127463;) <Arrow/> ___ (&#127472;&#127479;)</span>
      </Link>
      <Link to={`/review?source=ko&target=fr`} className="btn-type1">
        <span>한국어 (&#127472;&#127479;) <Arrow/> ___ (&#127467;&#127479;)</span>
      </Link>
      <Link to={`/review?source=fr&target=ko`} className="btn-type1">
        <span>Français (&#127467;&#127479;) <Arrow/> ___ (&#127472;&#127479;)</span>
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
