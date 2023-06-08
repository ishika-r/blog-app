import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { storeProfile, updateUser } from "../features/signup/signupSlice";
import { saveUser } from "../features/signup/signupApiSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Creating schema for validation
const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is required field")
    .min(6, "Password must be at least 6 characters long"),
  name: Yup.string()
    .required("Name is required field")
    .min(2, "Name must be at least 2 characters long"),
  mobile_number: Yup.string().matches(
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    "Mobile number is not valid"
  ),
});

const Index = () => {
  const dispatch = useDispatch();
  const signupUser = useSelector((state: any) => state.signup.signup);

  const handleProfileChange = (event: any) => {
    const profile = event.target.files[0];
    dispatch(storeProfile(profile));
  };

  return (
    <div className="main">
      <ToastContainer />
      <div className="card card-singup">
        <div className="card-header">
          <h3>Sign Up</h3>
        </div>
        <div className="card-body">
          <Formik
            initialValues={signupUser}
            validationSchema={schema}
            onSubmit={(values, { setSubmitting }) => {
              const formData: any = new FormData();
              formData.append("name", values.name);
              formData.append("mobile_number", values.mobile_number);
              formData.append("email", values.email);
              formData.append("password", values.password);
              formData.append("profile", signupUser.profile);
              // To retreive form data
              for (var pair of formData.entries()) {
                console.log(pair[0] + " - " + pair[1]);
              }
              dispatch(saveUser(formData));
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="row">
                  <div className="col-lg-6">
                    <label htmlFor="name">Full name</label>
                    <Field
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter your name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error"
                    />
                  </div>
                  <div className="col-lg-6">
                    <label htmlFor="mobile_number">Mobile Number</label>
                    <Field
                      type="text"
                      name="mobile_number"
                      className="form-control"
                      placeholder="Enter your mobile number"
                    />
                    <ErrorMessage
                      name="mobile_number"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
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
                  <div className="col-lg-6">
                    <label htmlFor="password">Password</label>
                    <Field
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <label htmlFor="profile">Profile Picture</label>
                    <input
                      type="file"
                      name="profile"
                      className="form-control"
                      onChange={handleProfileChange}
                    />
                  </div>
                  {signupUser.profile && (
                    <div className="col-lg-6">
                      <img
                        src={URL.createObjectURL(signupUser.profile)}
                        alt="Selected File"
                        width={200}
                        height={100}
                      />
                    </div>
                  )}
                </div>
                <div className="btn-div p-2">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Save User
                  </button>
                  <div className="vertical-line"></div>
                  <div className="already-registered">
                    Already Registered?
                    <Link href="/signin">Click here to SignIn</Link>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Index;
