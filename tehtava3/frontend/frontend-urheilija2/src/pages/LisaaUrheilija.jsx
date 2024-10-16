import { useState } from "react";
import { addItem } from "../services/urheilijat";

export default function LisaaUrheilija() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [weigth, setWeigth] = useState("");
  const [picture, setPicture] = useState("");
  const [sport, setSport] = useState("");
  const [accomplishments, setAccomplishments] = useState("");
  const [alert, setAlert] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      nickName === "" ||
      birthday === "" ||
      weigth === "" ||
      picture === "" ||
      sport === "" ||
      accomplishments === ""
    ) {
      setAlert("VIRHE! Kaikkien kenttien on oltava täytettynä");
      return;
    }

    try {
      const response = await addItem(
        firstName,
        lastName,
        nickName,
        birthday,
        weigth,
        picture,
        sport,
        accomplishments
      );

      if (response.status === 200) {
        setAlert("Urheilijan lisäys onnistui!");
      } else {
        setAlert("VIRHE! Urheilijan lisäys epäonnistui");
      }
    } catch {
      setAlert("VIRHE! Syötetyt tiedot virheellisessä muodossa");
    }
  };

  return (
    <p>
      <h2>Lisää</h2>
      <form onSubmit={handleSubmit}>
        Lisää tietokantaan uusi urheilija
        <br />
        Syötä uuden urheilijan tiedot:
        <br />
        <input
          type="text"
          placeholder="Etunimi"
          onChange={(event) => setFirstName(event.target.value)}
          value={firstName}
        />
        <br />
        <input
          type="text"
          placeholder="Sukunimi"
          onChange={(event) => setLastName(event.target.value)}
          value={lastName}
        />
        <br />
        <input
          type="text"
          placeholder="Kutsumanimi"
          onChange={(event) => setNickName(event.target.value)}
          value={nickName}
        />
        <br />
        <input
          type="text"
          placeholder="Syntymäpäivä"
          onChange={(event) => setBirthday(event.target.value)}
          value={birthday}
        />
        <br />
        <input
          type="text"
          placeholder="Paino"
          onChange={(event) => setWeigth(event.target.value)}
          value={weigth}
        />
        <br />
        <input
          type="text"
          placeholder="Kuvan URL osoite"
          onChange={(event) => setPicture(event.target.value)}
          value={picture}
        />
        <br />
        <input
          type="text"
          placeholder="Laji"
          onChange={(event) => setSport(event.target.value)}
          value={sport}
        />
        <br />
        <input
          type="text"
          placeholder="Saavutukset"
          onChange={(event) => setAccomplishments(event.target.value)}
          value={accomplishments}
        />
        <br />
        <button>Lisää</button>
      </form>

      {alert && (
        <div>
          <p style={{ color: "red" }}>{alert}</p>
        </div>
      )}
    </p>
  );
}
