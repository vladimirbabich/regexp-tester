import { useAppDispatch, useAppSelector } from '../app/hooks';
import { NavLink } from 'react-router-dom';
import './../styles/Select.scss';
import { setSelectedFunction } from '../features/testForm/testFormSlice';

export function SignLink() {
  return (
    <NavLink to="/sign" className="link">
      Sign Up/In
    </NavLink>
  );
}
