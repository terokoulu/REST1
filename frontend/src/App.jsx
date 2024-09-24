import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Hakusivu from "./components/Hakusivu";
import Lisayssivu from "./components/Lisayssivu";   


function App() {
  const [sivu, setSivu] = useState("Aloitussivu ");

  const meneSivulle = (sivu) => (event) => {
    event.preventDefault();
    setSivu(sivu);
  };

  const sisalto = () => {
    if (sivu === "Aloitussivu") {
      return <App />;
    } else if (sivu === "Hakusivu") {
      return <Hakusivu />;
    } else if (sivu === "Lisayssivu") {
      return <Lisayssivu />;
    }
  };
  const padding = {
    padding: 5,
  };  

  return (
    <>
      <h1>Sanakirja</h1>
      <a href="" onClick={meneSivulle("Hakusivu")} style={padding}>
        Hae käännöstä
      </a>
      <br></br>
      <a href="" onClick={meneSivulle("Lisayssivu")} style={padding}>
        Lisää käännös
      </a>      

      {sisalto()}
    </>
  );
}

export default App;
