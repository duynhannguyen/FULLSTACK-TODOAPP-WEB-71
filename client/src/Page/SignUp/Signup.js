import React, { useState } from "react";
import Button from "../../Components/Button/Button.js";
import FieldTextInput from "../../Components/FieldTextInput/FieldTextInput";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import AuthApi from "../../services/AuthAPI.js";
import CustomErrorMessage from "../../Components/CustomErrorMessage/CustomErrorMessage.js";
const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const signupSchema = yup.object().shape({
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
    fullname: yup.string().required("fullname is required"),
    address: yup.string().optional(),
    gender: yup.string().oneOf(["male", "female", "other"]),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      address: "",
      fullname: "",
      gender: "male",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setError(null);
        await AuthApi.signUp(values);
        navigate("/login");
      } catch (error) {
        setError(error.response.data?.message);
      } finally {
        setLoading(false);
      }
    },
    validationSchema: signupSchema,
  });
  const { handleSubmit, handleChange, errors } = formik;
  return (
    <div className="  flex justify-center items-center mt-10">
      <div className="w-full md:max-w-md">
        <form
          className="bg-emerald-300 shadow-lg rounded p-8 "
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl text-center mb-6">Register account</h2>
          <div className="flex flex-col gap-4">
            {error && <p className="text-red-500 font-bold"> {error} </p>}
            <FieldTextInput
              label="Fullname"
              id="fullname"
              name="fullname"
              handleChange={handleChange}
            />
            {errors.fullname && (
              <CustomErrorMessage content={errors.fullname} />
            )}
            <FieldTextInput
              label="Email"
              id="email"
              name="email"
              handleChange={handleChange}
            />
            {errors.email && <CustomErrorMessage content={errors.email} />}

            <FieldTextInput
              label="Address (optinal)"
              id="address"
              name="address"
              handleChange={handleChange}
            />
            {errors.address && <CustomErrorMessage content={errors.address} />}

            <FieldTextInput
              label="password"
              id="password"
              name="password"
              type="password"
              handleChange={handleChange}
            />
            {errors.password && (
              <CustomErrorMessage content={errors.password} />
            )}
          </div>
          <Button type="submit" isLoading={loading}>
            SignUp
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
