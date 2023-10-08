import React, { useState } from "react";
import FieldTextInput from "../../Components/FieldTextInput/FieldTextInput.js";
import Button from "../../Components/Button/Button.js";
import { useFormik } from "formik";
import * as yup from "yup";
import AuthApi from "../../services/AuthAPI.js";
import { useNavigate } from "react-router-dom";
import CustomErrorMessage from "../../Components/CustomErrorMessage/CustomErrorMessage.js";
import { TOKEN_TYPES } from "../../Constant/Constant.js";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/auth/AuthSlice.js";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email()
      .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invaid email address")
      .required("email is required"),
    password: yup
      .string()
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).*$/,
        "Password must contain at least one number, one special character, and one uppercase letter"
      )
      .min(8, "password must be at least 8 characters ")
      .required("password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError(null);
        const response = await AuthApi.login(values);
        const accessToken = response.data.accessToken;
        if (accessToken) {
          localStorage.setItem(TOKEN_TYPES.ACCESS_TOKEN, accessToken);
          const currentUserResponse = await AuthApi.fetchCurrentUser();
          const currentUserData = currentUserResponse.data;
          const payload = {
            currentUser: currentUserData,
          };
          dispatch(login(payload));
        }
        navigate("/");
      } catch (error) {
        setError(error.response.data?.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    validationSchema: loginSchema,
  });

  // console.log(error);
  const { handleSubmit, handleChange, errors } = formik;
  return (
    <div className="  flex justify-center items-center mt-10">
      <div className="w-full md:max-w-md">
        <form
          className="bg-emerald-300 shadow-lg rounded p-8 "
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl text-center mb-6">Login</h2>
          <div className="flex flex-col gap-4">
            {error && <p className="text-red-500 font-bold">{error}</p>}
            <FieldTextInput
              label="Email"
              id="email"
              name="email"
              handleChange={handleChange}
            />
            {errors.email && <CustomErrorMessage content={errors.email} />}
            <FieldTextInput
              label="Password"
              id="Password"
              name="password"
              type="password"
              handleChange={handleChange}
            />
            {errors.password && (
              <CustomErrorMessage content={errors.password} />
            )}
          </div>
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
