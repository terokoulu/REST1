import { useState, useEffect } from "react";
import React from "react";
import { addItem } from "../services/dictionary";

function Lisayssivu() {
  const [wordInput, setWordInput] = useState("");
  const [translationInput, setTranslationInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem(wordInput, translationInput);
    setWordInput("");
    setTranslationInput("");
  };  

  return (
    <>
      <form onSubmit={handleSubmit}>
      <label>
      <p>Suomeksi: <input
          type="text"
          onChange={(event) => setWordInput(event.target.value)}
          value={wordInput}
        /></p>
        <p>Englanniksi: <input
          type="text"
          onChange={(event) => setTranslationInput(event.target.value)}
          value={translationInput}
        /></p>
      </label>
      <button type="submit">Lisää</button>
      </form>
    </>
  );
}

export default Lisayssivu;
