import { NavLink } from 'react-router-dom';
import './../styles/Select.scss';

export function SignLink() {
  return (
    <NavLink to="/sign" className="link">
      Sign Up/In
    </NavLink>
  );
}
