import { useAppDispatch, useAppSelector } from '../app/hooks';
import { NavLink } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import './../styles/Header.scss';
import { setUserToken } from '../features/global/globalSlice';
import { useState } from 'react';
import { IDecodedUserToken } from '../models/objectModels';
import { LocalStorageController } from '../controllers/StorageController';

const localStorageController = new LocalStorageController();
export function AccLink() {
  const userToken = localStorage.getItem('userToken');

  let decoded: IDecodedUserToken | undefined = undefined;
  if (userToken) decoded = jwtDecode(userToken);
  const [isNavListOpen, setIsNavListOpen] = useState<boolean>(false);
  const username = decoded?.nickname || 'My account';
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
                dispatch(setUserToken(''));
              }}>
              <NavLink to="/">Exit</NavLink>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}
