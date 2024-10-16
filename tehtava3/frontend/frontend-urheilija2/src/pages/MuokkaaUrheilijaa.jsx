import { useState } from "react";
import { getItem, updateItem } from "../services/urheilijat";

export default function MuokkaaUrheilijaa() {
  const [firstNameSearchInput, setFirstNameSearchInput] = useState("");
  const [lastNameSearchInput, setLastNameSearchInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [nickNameInput, setNickNameInput] = useState("");
  const [birthdayInput, setBirthdayInput] = useState("");
  const [weigthInput, setWeigthInput] = useState("");
  const [pictureInput, setPictureInput] = useState("");
  const [sportInput, setSportInput] = useState("");
  const [accomplishmentsInput, setAccomplishmentsInput] = useState("");

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    getItem(firstNameSearchInput, lastNameSearchInput).then((data) => {
      setFirstNameInput(data[0].etunimi);
      setLastNameInput(data[0].sukunimi);
      setNickNameInput(data[0].kutsumanimi);
      setBirthdayInput(data[0].syntymavuosi);
      setWeigthInput(data[0].paino);
      setPictureInput(data[0].kuva_url);
      setSportInput(data[0].laji);
      setAccomplishmentsInput(data[0].saavutukset);
      setFirstNameSearchInput("");
      setLastNameSearchInput("");
    });
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();

    const dataJson = {
      etunimi: firstNameInput,
      sukunimi: lastNameInput,
      kutsumanimi: nickNameInput,
      syntymavuosi: birthdayInput,
      paino: weigthInput,
      kuva_url: pictureInput,
      laji: sportInput,
      saavutukset: accomplishmentsInput,
    };

    dataJson.syntymavuosi = dataJson.syntymavuosi.split("T")[0];

    updateItem(firstNameInput, lastNameInput, dataJson);
  };

  return (
    <p>
      <form onSubmit={handleSubmitSearch}>
        <h2>Muokkaa</h2>
        Muokkaa tietokannassa olevaa urheilijaa
        <br />
        Syötä muokattavan urheilijan nimi:
        <br />
        <input
          type="text"
          placeholder="Etunimi"
          onChange={(event) => setFirstNameSearchInput(event.target.value)}
          value={firstNameSearchInput}
        />
        <input
          type="text"
          placeholder="Sukunimi"
          onChange={(event) => setLastNameSearchInput(event.target.value)}
          value={lastNameSearchInput}
        />
        <br />
        <button>Hae</button>
        <br />
      </form>
      <form onSubmit={handleSubmitUpdate}>
        {firstNameInput && (
          <div>
            <p> Syötä muokattavan urheilijan uudet tiedot:</p>
            <img
              src={pictureInput}
              style={{ width: "150px", height: "auto" }}
            />
            <p>
              Etunimi:{" "}
              <input
                type="text"
                defaultValue={firstNameInput}
                onChange={(e) => setFirstNameInput(e.target.value)}
              />
            </p>
            <p>
              Sukunimi:{" "}
              <input
                type="text"
                defaultValue={lastNameInput}
                onChange={(e) => setLastNameInput(e.target.value)}
              />
            </p>
            <p>
              Lempinimi:{" "}
              <input
                type="text"
                defaultValue={nickNameInput}
                onChange={(e) => setNickNameInput(e.target.value)}
              />
            </p>
            <p>
              Syntymäpäivä:{" "}
              <input
                type="text"
                defaultValue={birthdayInput}
                onChange={(e) => setBirthdayInput(e.target.value)}
              />
            </p>
            <p>
              Paino:{" "}
              <input
                type="text"
                defaultValue={weigthInput}
                onChange={(e) => setWeigthInput(e.target.value)}
              />
            </p>
            <p>
              Laji:{" "}
              <input
                type="text"
                defaultValue={sportInput}
                onChange={(e) => setSportInput(e.target.value)}
              />
            </p>
            <p>
              Saavutukset:{" "}
              <input
                type="text"
                defaultValue={accomplishmentsInput}
                onChange={(e) => setAccomplishmentsInput(e.target.value)}
              />
            </p>
            <p>
              Kuva URL Osoite:{" "}
              <input
                type="text"
                defaultValue={pictureInput}
                onChange={(e) => setPictureInput(e.target.value)}
              />
            </p>
            <button>Tallenna muutokset</button>
          </div>
        )}
      </form>
    </p>
  );
}
