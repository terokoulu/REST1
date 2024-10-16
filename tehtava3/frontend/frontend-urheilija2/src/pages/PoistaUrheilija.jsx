import { useState } from "react";
import { deleteItem } from "../services/urheilijat";

export default function PoistaUrheilija() {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    deleteItem(firstNameInput, lastNameInput);
    setFirstNameInput("");
    setLastNameInput("");
  };

  return (
    <p>
      <form onSubmit={handleSubmit}>
        <h2>Poisto</h2>
        Poista urheilija tietokannasta
        <br />
        Syötä poistettavan urheilijan nimi:
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
      </form>
    </p>
  );
}
