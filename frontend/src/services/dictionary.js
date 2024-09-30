export function getAll() {
  const response =  fetch("http://localhost:3001/hae").then((data) => data.json());
  return response;
}

export function getItem(searchedWord) {
  const response =  fetch("http://localhost:3001/hae/" + searchedWord).then((data) => data.json());
  return response;
}

export function addItem(word, translation) {
  const response = fetch("http://localhost:3001/lisaa", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      word: word,
      translation: translation,
    }),
  }).then((data) => data.json());
  return response;
}
