import React, { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useKeyPress } from 'components/useKeyPress';
import { parseVocabularyFile, shuffle } from 'components/vocabulary';

import './ReviewPage.scss';

export function ReviewPage() {

  let [searchParams] = useSearchParams();
  let sourceLangCode = searchParams.get("source");
  if (!sourceLangCode)
    sourceLangCode = 'ko';
  let targetLangCode = searchParams.get("target");
  if (!targetLangCode)
    targetLangCode = 'en';


  const [vocabulary, setVocabulary] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isWordHidden, setIsWordHidden] = useState(true);

  const rightPress = useKeyPress("ArrowRight");
  const leftPress = useKeyPress("ArrowLeft");
  const spacePress = useKeyPress(" "); // Space bar

  function moveWord(step){
    let nextIndex = currentIndex + step;
    if (vocabulary && nextIndex >= 0 && nextIndex < vocabulary?.length){
      setCurrentIndex(nextIndex);
      setIsWordHidden(true);
    }
  }

  // Load vocabulary from CSV file
  useEffect(() => {
    fetch('/database/vocabulary.csv')
      .then((r) => r.text())
      .then(text  => {
        var vocab = shuffle(parseVocabularyFile(text));
        setVocabulary(vocab);
      })  
  }, [setVocabulary]);

  // Handle arrow key input
  useEffect(() => {
    if (rightPress) {
      moveWord(+1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rightPress]);
  useEffect(() => {
    if (leftPress) {
      moveWord(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftPress]);
  useEffect(() => {
    if (spacePress) {
      document.activeElement.blur();
      setIsWordHidden(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spacePress]);




  let currentWord = vocabulary ? vocabulary[currentIndex] : null;

  return (
    <div style={{
      marginTop: '30px',
    }}>
      {vocabulary && (
        <div>
          <div style={{position: 'relative', height: '50px', width: '100%'}}>
            <div className="word-counter" style={{
              position: 'absolute',
              top: '8px',
              left: '50%',
              transform: 'translateX(-50%)'
            }}>
              {currentIndex + 1}/{vocabulary?.length}
            </div>

            <div style={{
              position: 'absolute',
              left: '20px'
            }}>
              <button className="move-button" onClick={() => moveWord(-1)} disabled={!vocabulary || currentIndex === 0}>
                <NavigateBeforeIcon style={{ fontSize: '40px' }}/>
              </button>
            </div>
            <div style={{
              position: 'absolute',
              right: '20px'
            }}>
              <button className="move-button" onClick={() => moveWord(+1)} disabled={!vocabulary || currentIndex >= vocabulary?.length - 1}>
                <NavigateNextIcon style={{ fontSize: '40px' }}/>
              </button>
            </div>
          </div>
          
          <div style={{ marginTop: '70px' }}>
            <WordGuessComponent
              wordObject={currentWord}
              sourceLangCode={sourceLangCode}
              targetLangCode={targetLangCode}
              showWordCallback={() => setIsWordHidden(false)}
              isWordHidden={isWordHidden}
            />
          </div>

          <div style={{ margin: '60px 15px 0 15px', textAlign: 'right' }}>
            <a className="dictionary-button"
              href={`https://korean.dict.naver.com/koendict/#/search?query=${currentWord.ko}`}
              target="_blank" rel="noreferrer">
              Naver Dictionary <OpenInNewIcon style={{ transform: 'translateY(4px)', fontSize: '17px' }}/>
            </a>
          </div>
          
        </div>
      )}
      {!vocabulary && (
        <div>Loading vocabulary...</div>
      )}
    </div>
  );
}

function WordGuessComponent({wordObject, sourceLangCode, targetLangCode, isWordHidden, showWordCallback}){
  return (
    <div style={{
      textAlign: 'center',
    }}>
      <div>
        <span className={`word-source ${sourceLangCode}-lang`}>
          {wordObject[sourceLangCode]}
        </span>
      </div>
      <div style={{ marginTop: '40px' }}>
        {isWordHidden && (
          <button className="btn-reveal" onClick={showWordCallback}>
            <VisibilityIcon style={{ fontSize: '40px' }}/>
          </button>
        )}
        {!isWordHidden && (
          <div className={`word-revealed ${targetLangCode}-lang`} >
            {wordObject[targetLangCode]}
          </div>
        )}
      </div>
    </div>
  );
}
