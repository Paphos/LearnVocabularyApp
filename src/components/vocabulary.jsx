
export function parseVocabularyFile(rawText){
    const lines = rawText.split(/\r\n|\n/);
    const vocabList = [];
    for (let i = 0; i < lines.length; i++) {
      if (!lines[i])
        continue;
      const row = lines[i].split(';');
      vocabList.push({
        ko: row[0],
        en: row[1],
        fr: row[2],
      })
    }
    return vocabList;
}
  
// https://stackoverflow.com/a/2450976
export function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}