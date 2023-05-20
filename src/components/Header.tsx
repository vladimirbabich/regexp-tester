import { Link } from 'react-router-dom';
import './../styles/Header.scss';
import Navigation from './Navigation';
import logo from './../static/reLogoHeader.svg';
export default function Header() {
  function handleLogoClick(e: React.MouseEvent) {
    console.log(123);
  }
  return (
    <header className="header">
      <Link to="/" className="linkLogo">
        <img src={logo} alt="REtester" onClick={handleLogoClick}></img>
      </Link>
      <Navigation className="menuList" />
    </header>
  );
}
//style={{marginRight:'10px'}}
