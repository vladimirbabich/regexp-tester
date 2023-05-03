import { useAppDispatch, useAppSelector } from '../app/hooks';
import { NavLink } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import './../styles/Header.scss';
import { setSelectedFunction } from '../features/testForm/testFormSlice';
import { setNotificationText } from '../features/global/globalSlice';
import { useState } from 'react';

export function AccLink() {
  const storedUser = localStorage.getItem('userToken');
  let decoded: any = undefined;
  if (storedUser) decoded = jwtDecode(storedUser);
  const [isNavListOpen, setIsNavListOpen] = useState<boolean>(false);
  const username = decoded?.nickname || localStorage.getItem('genUserNickname');
  const dispatch = useAppDispatch();
  return (
    <>
      <div
        className="link"
        onMouseEnter={() => {
          setIsNavListOpen(true);
        }}
        onMouseLeave={() => {
          setIsNavListOpen(false);
        }}>
        {username} {isNavListOpen ? '△' : '▽'}
        {isNavListOpen && (
          <ul className="navList">
            {/* <li>
            <NavLink to="/stats">Stats</NavLink>
          </li> */}
            <li
              onClick={() => {
                localStorage.removeItem('userToken');
              }}>
              <NavLink to="/">Exit</NavLink>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
