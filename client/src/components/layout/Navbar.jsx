import { Link } from "react-router-dom";
import { useGlobalAuthContext } from "../../hooks";

import NavListItem from './NavListItem';

const Navbar = () => {
  const { user, loading, logout } = useGlobalAuthContext();

  const navListItems = [
    {
      to: '/',
      text: 'Home',
      condition: true,
    },
    {
      to: '/add',
      text: 'Add Shoe',
      condition: user && user.role === 'admin',
    },
  ];

  return (
    <nav className="navbar">
      <Link to='/'>
        <h1 className="logo">naalaim</h1>
      </Link>
      <ul className="nav-links">
        {navListItems.map((link) => link.condition && (
          <NavListItem key={link.text} {...link} />
        ))}
      </ul>
      <div className="log-in-and-out">
        {user && !loading ? (
          <>
            <p className="user-name">{`Hello ${user.name}`}</p>
            <Link
              to='/'
              className='btn login-btn'
              onClick={logout}>
              Log Out
            </Link>
          </>
        ) : (
          <Link
              to='/auth'
            className='btn login-btn'>
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
