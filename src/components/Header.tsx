import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './../styles/Header.scss';
import { AccLink } from './AccLink';
import { SignLink } from './SignLink';

export default function Header() {
  const [userToken, setUserToken] = useState<string | null>(
    localStorage.getItem('userToken')
  );
  // console.log(userToken);
  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    if (userToken != storedToken) setUserToken(storedToken);
  });
  return (
    <header className="header">
      <Link to="/" className="logo">
        RegExp TESTER
      </Link>
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
        {userToken ? <AccLink /> : <SignLink />}
      </div>
    </header>
  );
}
//style={{marginRight:'10px'}}
