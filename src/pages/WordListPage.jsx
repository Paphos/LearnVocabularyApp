import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { parseVocabularyFile } from 'components/vocabulary';
import { useParams } from "react-router-dom";

import './WordListPage.scss';

export function WordListPage() {

  let { langCode } = useParams();

  if (langCode !== 'en' && langCode !== 'fr'){
    langCode = 'en';
  }


  const [vocabulary, setVocabulary] = useState(null);
  const [searchText, setSearchText] = useState(null);

  // Load vocabulary from CSV file
  useEffect(() => {
    fetch('/database/vocabulary.csv')
      .then((r) => r.text())
      .then(text  => {
        var vocab = parseVocabularyFile(text);
        setVocabulary(vocab);
      })  
  }, [setVocabulary]);

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