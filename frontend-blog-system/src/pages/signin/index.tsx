import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginUser } from "../features/signin/signinApiSlice";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/router";
// Creating schema for validation
const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is required field")
    .min(6, "Password must be at least 6 characters long"),
});

const index = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const handlePasswordToggle = () => {
    setTogglePassword(!togglePassword);
  };
  console.log("toggle password", togglePassword);
  const dispatch = useDispatch();
  const singinUser = useSelector((state: any) => state.signup.signup);
  const router = useRouter();

  return (
    <div className="main">
      <ToastContainer />
      <div className="card card-login">
        <div className="card-header">
          <h3>SignIn</h3>
        </div>
        <div className="card-body">
          <Formik
            initialValues={singinUser}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
              const formData: any = new FormData();
              formData.append("email", values.email);
              formData.append("password", values.password);
              // To retreive form data
              for (var pair of formData.entries()) {
                console.log(pair[0] + " - " + pair[1]);
              }
              dispatch(loginUser({ formData, router }));

              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group login-group">
                  <label htmlFor="email">Email</label>
                  <Field
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="form-group login-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-field">
                    <Field
                      type={togglePassword ? "text" : "password"}
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                    />
                    <div
                      className="toggle-password-icon"
                      onClick={handlePasswordToggle}
                    >
                      {togglePassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="btn-div mb-2 login-group">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Sign In to your account
                  </button>
                </div>
                <div className="already-registered">
                  Not Registered?
                  <Link href="/signup"> Click here to SignUp</Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default index;
