export function getAll() {
  return fetch("http://localhost:3001/hae").then((data) => data.json());
}

export function getItem(searchedWord) {
  return fetch("http://localhost:3001/hae/" + searchedWord).then((data) => data.json());
}

export function addItem(word, translation) {
  return fetch("http://localhost:3001/lisaa", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word, translation }),
  }).then((data) => data.json());
}
