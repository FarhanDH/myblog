import { Link } from 'react-router-dom';

export default function Header(params) {
  return (
    <header>
      <Link to="/" className="logo">
        MyBlogs
      </Link>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>
    </header>
  );
}
