import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Welcome.css";
import { useDispatch, useSelector } from "react-redux";
import {
  loggedInUserAsync,
  addUserAsync,
} from "../../Redux/Actions/userActions";
import Input from "../../Shared/Components/Input/Input";

function Form({ type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loggedInUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (loggedInUser) {
      navigate("/admin");
    }
  }, [loggedInUser, navigate]);

  const validationSchema = Yup.object({
    firstname: type === "signup" ? Yup.string().required("First Name is required") : Yup.string(),
    lastname: type === "signup" ? Yup.string().required("Last Name is required") : Yup.string(),
    email: Yup.string().required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (type === "login") {
        dispatch(loggedInUserAsync(values.email, values.password));
      } else {
        dispatch(addUserAsync(values));
      }
    },
  });

  return (
    <section className="form">
      <div className="msg text-center">
        <h1>{type === "login" ? "Welcome Back" : "Sign up for free"}</h1>
      </div>
      <form onSubmit={formik.handleSubmit} className="inputs d-flex flex-column gap-3">
        {type === "signup" && (
          <div className="row g-1">
            <div className="col-md-6 col-12">
              <Input
                type="text"
                name="firstname"
                placeholder="First Name*"
                className={`w-100 ${formik.touched.firstname && formik.errors.firstname ? "border-danger" : ""}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstname}
                error={formik.errors.firstname}
                touched={formik.touched.firstname}
              />
            </div>
            <div className="col-md-6 col-12">
              <Input
                type="text"
                name="lastname"
                placeholder="Last Name*"
                className={`w-100 ${formik.touched.lastname && formik.errors.lastname ? "border-danger" : ""}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastname}
                error={formik.errors.lastname}
                touched={formik.touched.lastname}
              />
            </div>
          </div>
        )}
        <div className="login-reg d-flex flex-column gap-3">
          <div className="email">
            <Input
              type="text"
              name="email"
              placeholder="Email*"
              className={`w-100 ${formik.touched.email && formik.errors.email ? "border-danger" : ""}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={formik.errors.email}
              touched={formik.touched.email}
            />
          </div>
          <div className="password">
            <Input
              type="password"
              name="password"
              placeholder={type === "login" ? "Password*" : "Set a Password*"}
              className={`w-100 ${formik.touched.password && formik.errors.password ? "border-danger" : ""}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={formik.errors.password}
              touched={formik.touched.password}
            />
          </div>
        </div>
        <div className="submit-button d-flex justify-content-end">
          {type === "login" && (
            <Link to="/forgot-password">Forget Password?</Link>
          )}
        </div>
        <div className="submit-button">
          <button type="submit" className="btn btn-primary">
            {type === "login" ? "Login" : "Get Started"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Form;
