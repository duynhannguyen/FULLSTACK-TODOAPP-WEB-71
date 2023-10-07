import React from "react";
import Spinner from "../Spinner/Spinner.js";

const Button = ({ children, isLoading, type = "button", ...restProps }) => {
  return (
    <button
      type={type}
      className="bg-blue-500 hover:bg-blue-700 text-white text-center w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 "
      {...restProps}
    >
      {isLoading ? "Submitting" : children}
    </button>
  );
};

export default Button;
