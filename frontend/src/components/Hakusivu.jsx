import { useState, useEffect } from "react";
import React from "react";
import { getAll } from "../services/dictionary";
import { getItem } from "../services/dictionary";

function Hakusivu() {
  const [list, setList] = useState([]);
  const [itemInput, setItemInput] = useState("");
  const [translation, setTranslation] = useState("");


  useEffect(() => {
    getAll().then((data) => {
      setList(data.translations);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    getItem(itemInput).then((data) => {
      setTranslation(data.translation); 
    });
  };  

  return (
    <>
      <form onSubmit={handleSubmit}>
          <label>
            <p>Syötä sana suomeksi: <input
              type="text"
              onChange={(event) => setItemInput(event.target.value)}
              value={itemInput}
            />
          <button type="submit">Hae</button></p>
          </label>
          <p>Käännös: {translation}</p>
        </form>
    </>
  );
}

export default Hakusivu;
