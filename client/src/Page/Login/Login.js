import React from "react";
import FieldTextInput from "../../Components/FieldTextInput/FieldTextInput.js";
import Button from "../../Components/Button/Button.js";
const Login = () => {
  return (
    <div className="  flex justify-center items-center mt-10">
      <div className="w-full md:max-w-md">
        <form className="bg-emerald-300 shadow-lg rounded p-8 ">
          <h2 className="text-2xl text-center mb-6">Login</h2>
          <div className="flex flex-col gap-4">
            <FieldTextInput label="Email" id="Email" name="Email" />
            <FieldTextInput
              label="Password"
              id="Password"
              name="Password"
              type="password"
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
