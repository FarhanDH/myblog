import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import { config } from './config';

export default function Header() {
  // @ts-ignore
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch(`${config.apiUrl}/auth/checkToken`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((userInfo) => {
        if (userInfo.statusCode !== 200) {
          return;
        }
        setUserInfo(userInfo.data);
      });
  }, [setUserInfo]);

  function logout() {
    fetch(`${config.apiUrl}/auth/logout`, {
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        MyBlogs
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <Link to="/logout" onClick={logout}>
              Logout
            </Link>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
