import { NavLink } from 'react-router-dom';

const NavListItem = ({ to, text }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => isActive ? 'active' : undefined}>
        {text}
      </NavLink>
    </li>
  );
};
export default NavListItem;