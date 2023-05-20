import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './../styles/Header.scss';
import { AccLink } from './AccLink';
import { SignLink } from './SignLink';
import menuIcon from './../static/menu.svg';
import { INavigation } from '../models/componentModels';
import { useAppSelector } from '../app/hooks';

export default function Navigation({ className }: INavigation) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigationRef = useRef<HTMLImageElement>(null);
  function handleMenuIconClick(e: React.MouseEvent) {
    console.log('click');
    setIsMenuOpen((prev) => !prev);
  }
  const navLinks: { path: string; title: string }[] = [
    { path: '/all-questions', title: 'All questions' },
    { path: '/minutes-5', title: '5 minutes' },
    // { path: '/only-flags', title: 'Only flags' },
    { path: '/leaderboard', title: 'Leaderboard' },
  ];
  const [innerToken, setInnerToken] = useState<any>('');
  const userToken = useAppSelector((state) => state.global.userToken);
  useEffect(() => {
    console.log('userToken was changed: ' + userToken);
    setInnerToken(userToken);
  }, [userToken]);
  // console.log(innerToken);
  useEffect(() => {
    //close menu if click outside of menuIcon
    function handleClickOutside(event: MouseEvent) {
      if (
        navigationRef.current &&
        event.target instanceof Node &&
        !navigationRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigationRef]);

  return (
    <div
      className="navigation"
      ref={navigationRef as React.LegacyRef<HTMLImageElement>}>
      <img
        className="menuIcon"
        onClick={handleMenuIconClick}
        src={menuIcon}
        alt="regex menu"
      />
      {window.innerWidth < 670 && isMenuOpen && (
        <div className={className}>
          {navLinks.map((el, index) => (
            <NavLink className="link" key={index} to={el.path}>
              {el.title}
            </NavLink>
          ))}
          {innerToken ? <AccLink /> : <SignLink />}
        </div>
      )}
      {window.innerWidth >= 670 && (
        <div className={className}>
          {navLinks.map((el, index) => (
            <NavLink className="link" key={index} to={el.path}>
              {el.title}
            </NavLink>
          ))}
          {innerToken ? <AccLink /> : <SignLink />}
        </div>
      )}
    </div>
  );
}
