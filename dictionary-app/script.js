const searchBtn = document.getElementById('searchBtn');
const wordInput = document.getElementById('wordInput');
const resultDiv = document.getElementById('result');

searchBtn.addEventListener('click', () => {
  const word = wordInput.value.trim();
  if (!word) {
    resultDiv.innerHTML = "<p>Please enter a word.</p>";
    return;
  }

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Word not found");
      }
      return response.json();
    })
    .then(data => {
      const entry = data[0];
      const meaning = entry.meanings[0];
      const definition = meaning.definitions[0].definition;
      const partOfSpeech = meaning.partOfSpeech;
      const phonetic = entry.phonetics.find(p => p.text)?.text || "N/A";
      const audio = entry.phonetics.find(p => p.audio)?.audio;

      resultDiv.innerHTML = `
        <h2>${entry.word}</h2>
        <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
        <p><strong>Phonetic:</strong> ${phonetic}</p>
        <p><strong>Definition:</strong> ${definition}</p>
        ${audio ? `<audio controls src="${audio}"></audio>` : "<p>No audio available.</p>"}
      `;
    })
    .catch(error => {
      resultDiv.innerHTML = `<p>❌ ${error.message}</p>`;
    });
});
