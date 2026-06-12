import * as Yup from "yup";

export const userRegisterValidation = Yup.object({
  fullName: Yup.string().required("Fullname is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirmed password is required"),
});

export const userLoginValidation = Yup.object({
  identifier: Yup.string().required("Username or email is required"),
  password: Yup.string().required("Password is required"),
});
