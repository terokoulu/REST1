import "./App.css";
import Navigointipalkki from "./Navigointipalkki";
import Koti from "./pages/Koti";
import HaeUrheilija from "./pages/HaeUrheilija";
import LisaaUrheilija from "./pages/LisaaUrheilija";
import MuokkaaUrheilijaa from "./pages/MuokkaaUrheilijaa";
import PoistaUrheilija from "./pages/PoistaUrheilija";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navigointipalkki />
      <div className="container">
        <Routes>
          {/* Tehdään reitiykset kaikkiin sivuille ja kerrotaan mitä URL osoitetta kukin sivu vastaa */}
          <Route path="/" element={<Koti />} />
          <Route path="/hae_urheilija" element={<HaeUrheilija />} />
          <Route path="/lisaa_urheilija" element={<LisaaUrheilija />} />
          <Route path="/muokkaa_urheilijaa" element={<MuokkaaUrheilijaa />} />
          <Route path="/poista_urheilijaa" element={<PoistaUrheilija />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
