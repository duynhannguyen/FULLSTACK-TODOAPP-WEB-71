import * as yup from "yup";

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
const AuthValidator = {
  signupSchema,
  loginSchema,
};

export default AuthValidator;
