import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './../styles/Header.scss';
import { AccLink } from './AccLink';
import { SignLink } from './SignLink';
import menuIcon from './../static/menu.svg';
import { INavigation } from '../models/componentModels';
import { useAppSelector } from '../app/hooks';

const SIZE_TABLET_MIN = 670;
export default function Navigation({ className }: INavigation) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const navigationRef = useRef<HTMLImageElement>(null);
  function handleMenuIconClick(e: React.MouseEvent) {
    setIsMenuOpen((prev) => !prev);
  }
  const navLinks: { path: string; title: string }[] = [
    { path: '/quiz', title: 'Quiz' },
    { path: '/all-questions', title: 'Open-ended: All' },
    { path: '/minutes-5', title: 'Open-ended: 5min' },
    // { path: '/only-flags', title: 'Only flags' },
    { path: '/leaderboard', title: 'Leaderboard' },
  ];
  const userToken = localStorage.getItem('userToken');
  useEffect(() => {
    console.log('useEffect: Navigation');
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
  function handleMenuItemClick() {
    setIsMenuOpen(false);
  }
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
      {window.innerWidth < SIZE_TABLET_MIN && isMenuOpen && (
        <div className={className}>
          {navLinks.map((el, index) => (
            <NavLink
              className="link"
              key={index}
              to={el.path}
              onClick={handleMenuItemClick}>
              {el.title}
            </NavLink>
          ))}
          {userToken ? <AccLink /> : <SignLink />}
        </div>
      )}
      {window.innerWidth >= SIZE_TABLET_MIN && (
        <div className={className}>
          {navLinks.map((el, index) => (
            <NavLink className="link" key={index} to={el.path}>
              {el.title}
            </NavLink>
          ))}
          {userToken ? <AccLink /> : <SignLink />}
        </div>
      )}
    </div>
  );
}
