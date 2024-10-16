import PropTypes from "prop-types";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navigointipalkki() {
  return (
    <nav className="nav">
      <ul>
        <Link to="/" className="site-title">
          Urheilijasivu
        </Link>
        <Linkki to="/hae_urheilija">Haku</Linkki>
        <Linkki to="/lisaa_urheilija">Lisää</Linkki>
        <Linkki to="/muokkaa_urheilijaa">Muokkaa</Linkki>
        <Linkki to="/poista_urheilijaa">Poista</Linkki>
      </ul>
    </nav>
  );
}

// Linkkifunktio, jolla voidaan luoda siirtymiä sivuille
function Linkki({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to); // Otetaan koko polku
  const isActive = useMatch({ path: resolvedPath.pathname, end: true }); // Tarkistetaan että URL polku on tismalleen sama

  return (
    // Asetetaan sivu aktiiviseksi jos URL polku vastaa sivun polkua
    <button type="button" className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </button>
  );
}

Linkki.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
