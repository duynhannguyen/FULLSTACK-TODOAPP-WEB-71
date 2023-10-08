import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
const Header = () => {
  const { isAuthenticated, currentUser } = useSelector((state) => state.auth);
  const publicNavs = (
    <>
      <li>
        <Link to="/signup" className="text-gray-500 hover:text-gray-600">
          Sign up
        </Link>
      </li>
      <li>
        <Link to="/login" className="text-gray-500 hover:text-gray-600">
          Log in
        </Link>
      </li>
    </>
  );

  const authenticatedNavs = (
    <>
      <li>
        <p className="text-gray-500 hover:text-gray-600">Log out</p>
      </li>
      <li>
        <p className="text-gray-500 hover:text-gray-600">
          {currentUser.fullname}
        </p>
      </li>
    </>
  );
  return (
    <header className="flex items-center justify-between px-4 py-6 bg-white">
      <div className="flex items-center">
        <Link to="/" className="text-2xl font-bold text-black">
          TO-DO LIST
        </Link>
      </div>
      <nav>
        <ul className="flex items-center gap-4">
          {isAuthenticated ? authenticatedNavs : publicNavs}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
