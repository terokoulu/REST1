export function getAll() {
  const response = fetch("http://localhost:3001/urheilijat").then((data) =>
    data.json()
  );
  return response;
}

export function getItem(searchedFirstName, searchedLastName) {
  const response = fetch(
    "http://localhost:3001/urheilija?etunimi=" +
      searchedFirstName +
      "&sukunimi=" +
      searchedLastName
  ).then((data) => data.json());
  return response;
}

export function addItem(
  firstName,
  lastName,
  nickName,
  birthday,
  weigth,
  picture,
  sport,
  accomplishments
) {
  const response = fetch("http://localhost:3001/lisaa", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      etunimi: firstName,
      sukunimi: lastName,
      kutsumanimi: nickName,
      syntymavuosi: birthday,
      paino: weigth,
      kuva_url: picture,
      laji: sport,
      saavutukset: accomplishments,
    }),
  }).then((data) => data.json());
  console.log(response.body);
  return response;
}

export function updateItem(updatedFirstName, updatedLastName, updatedData) {
  console.log(updatedData);
  console.log(JSON.stringify(updatedData));
  return fetch(
    "http://localhost:3001/urheilijat?etunimi=" +
      updatedFirstName +
      "&sukunimi=" +
      updatedLastName,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    }
  );
}

export function deleteItem(deletedFirstName, deletedLastName) {
  const response = fetch(
    "http://localhost:3001/urheilija?etunimi=" +
      deletedFirstName +
      "&sukunimi=" +
      deletedLastName,
    {
      method: "DELETE",
    }
  ).then((data) => data.json());
  return response;
}
