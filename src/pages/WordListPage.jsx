import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { parseVocabularyFile } from 'components/vocabulary';
import { useParams, useSearchParams } from "react-router-dom";

import './WordListPage.scss';

export function WordListPage() {

  let { langCode } = useParams();

  if (langCode !== 'en' && langCode !== 'fr'){
    langCode = 'en';
  }


  let [searchParams] = useSearchParams();
  let topicId = searchParams.get("topicId");
  if (!topicId){
    topicId = "objects";
  }





  const [vocabulary, setVocabulary] = useState(null);
  const [searchText, setSearchText] = useState(null);

  // Load vocabulary from CSV file
  useEffect(() => {
    fetch(`/database/${topicId}.csv`)
      .then((r) => r.text())
      .then(text  => {
        var vocab = parseVocabularyFile(text);
        setVocabulary(vocab);
      })  
  }, [setVocabulary, topicId]);

  return (
    <div>
      <div style={{margin: '5px 10px', position: 'relative'}}>
        <input className='search-text-input' placeholder='Filter...' onInput={(e) => setSearchText(e.target.value)}/>
        <SearchIcon style={{
          position: 'absolute',
          right: '0',
          color: '#888',
          fontSize: '30px',
          margin: '4px'
        }}/>
      </div>
      {vocabulary && (
        <div>
          <table className='word-list-table'>
            <tbody>
              {vocabulary.filter(wordObj => filterMatches(wordObj, searchText, langCode)).map((wordObject, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 'bold' }}>{wordObject.ko}</td>
                  <td>{wordObject[langCode]}</td>
                  {(topicId === 'verbs' || topicId === 'adjectives') && (
                    <td>
                      <a className="conjugator-button2"
                        href={`https://www.verbix.com/webverbix/korean/${wordObject.ko.split('/')[0].split(' ').slice(-1)[0]}`}
                        target="_blank" rel="noreferrer">
                        <AutoFixHighIcon style={{ transform: 'translateY(2px)', fontSize: '15px' }}/>
                      </a>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
      )}
      {!vocabulary && (
        <div>Loading vocabulary...</div>
      )}
    </div>
  );
}

function filterMatches(wordObject, searchText, langCode){
  if (!searchText){
    return true;
  }

  let lowerCaseSearchText = searchText.toLowerCase();

  return ((wordObject.ko && wordObject.ko.toLowerCase().includes(lowerCaseSearchText))
    || (wordObject[langCode] && wordObject[langCode].toLowerCase().includes(lowerCaseSearchText)))
}