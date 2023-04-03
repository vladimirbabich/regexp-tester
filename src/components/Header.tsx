import { NavLink, Link } from 'react-router-dom';
import './../styles/Header.scss';

export default function Header() {
  return (
    <header className="header">
      <Link to='/' className="logo">RegExp TESTER</Link>
      <div className="navigation">
        {/* <NavLink className="link testStuff" to="/test">
          TEST!!!
        </NavLink>
        <NavLink className="link testStuff" to="/results">
          results
        </NavLink> */}
        <NavLink className="link" to="/all">
          All questions
        </NavLink>
        <NavLink className="link" to="/">
          5 minutes test
        </NavLink>
        <NavLink className="link" to="/flags">
          Flags test
        </NavLink>
        <NavLink className="link" to="/leaderboard">
          Leaderboard
        </NavLink>
      </div>
    </header>
  );
}
//style={{marginRight:'10px'}}
