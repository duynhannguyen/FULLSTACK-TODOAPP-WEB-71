import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/auth/AuthSlice.js";

const Header = () => {
  const { isAuthenticated, currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };
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
        <p
          className="text-gray-500 hover:text-gray-600 cursor: pointer"
          onClick={onLogoutHandler}
        >
          Log out
        </p>
      </li>
      <li>
        <p className="text-gray-500 hover:text-gray-600">
          <Link to={"/profile"}> Hello {currentUser.fullname} </Link>
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
