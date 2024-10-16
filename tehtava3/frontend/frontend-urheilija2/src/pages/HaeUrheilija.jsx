import { useState } from "react";
import { getItem } from "../services/urheilijat";

export default function HaeUrheilija() {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [weigth, setWeigth] = useState("");
  const [picture, setPicture] = useState("");
  const [sport, setSport] = useState("");
  const [accomplishments, setAccomplishments] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    getItem(firstNameInput, lastNameInput).then((data) => {
      setFirstName(data[0].etunimi);
      setLastName(data[0].sukunimi);
      setNickName(data[0].kutsumanimi);
      setBirthday(data[0].syntymavuosi);
      setWeigth(data[0].paino);
      setPicture(data[0].kuva_url);
      setSport(data[0].laji);
      setAccomplishments(data[0].saavutukset);
    });
  };

  return (
    <p>
      <form onSubmit={handleSubmit}>
        <h2>Haku</h2>
        Hae tietokannassa oleva urheilija
        <br />
        Syötä haettavan urheilijan nimi:
        <br />
        <input
          type="text"
          placeholder="Etunimi"
          onChange={(event) => setFirstNameInput(event.target.value)}
          value={firstNameInput}
        />
        <input
          type="text"
          placeholder="Sukunimi"
          onChange={(event) => setLastNameInput(event.target.value)}
          value={lastNameInput}
        />
        <br />
        <button>Hae</button>
        <br />
        {firstName && (
          <div>
            <img src={picture} style={{ width: "150px", height: "auto" }} />
            <p>{`Nimi: ${firstName} "${nickName}" ${lastName}`}</p>
            <p>Syntymäpäivä: {birthday}</p>
            <p>Paino: {weigth}</p>
            <p>Laji: {sport}</p>
            <p>Saavutukset: {accomplishments}</p>
          </div>
        )}
      </form>
    </p>
  );
}
