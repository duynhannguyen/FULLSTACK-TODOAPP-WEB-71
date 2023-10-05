import React from "react";
import Button from "../../Components/Button/Button.js";
import FieldTextInput from "../../Components/FieldTextInput/FieldTextInput";
import { useFormik } from "formik";
const Signup = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      address: "",
      fullname: "",
      gender: "male",
    },
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  const { handleSubmit, handleChange } = formik;
  return (
    <div className="  flex justify-center items-center mt-10">
      <div className="w-full md:max-w-md">
        <form
          className="bg-emerald-300 shadow-lg rounded p-8 "
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl text-center mb-6">Register account</h2>
          <div className="flex flex-col gap-4">
            <FieldTextInput
              label="Fullname"
              id="fullname"
              name="fullname"
              handleChange={handleChange}
            />
            <FieldTextInput
              label="Email"
              id="email"
              name="email"
              handleChange={handleChange}
            />
            <FieldTextInput
              label="Address (optinal)"
              id="address"
              name="address"
              handleChange={handleChange}
            />
            <FieldTextInput
              label="password"
              id="password"
              name="password"
              type="password"
              handleChange={handleChange}
            />
          </div>
          <Button type="submit">SignUp</Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
