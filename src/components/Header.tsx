import { Link } from 'react-router-dom';
import './../styles/Header.scss';
import Navigation from './Navigation';
import logo from './../static/reLogoHeader.svg';
export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="linkLogo">
        <img src={logo} alt="REtester"></img>
      </Link>
      <Navigation className="menuList" />
    </header>
  );
}
//style={{marginRight:'10px'}}
