import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addUser, updateUser } from "../../../../features/Users/userSlice";

function AddUser({ id, singleuser, mode, onSave }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(singleuser);
  }, [singleuser]);

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First Name is required"),
    lastname: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstname: mode === "update" && user ? user.firstname : "",
      lastname: mode === "update" && user ? user.lastname : "",
      email: mode === "update" && user ? user.email : "",
      password: mode === "update" && user ? user.password : "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      if (mode === "update" && user) {
        dispatch(updateUser({ id: user.id, ...values })).then(onSave); 
      } else {
        dispatch(addUser(values)).then(onSave); 
      }
    },
  });

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      aria-labelledby="addUserModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addUserModalLabel">
              {mode === "update" ? "Update a User" : "Register a User"}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6 col-12">
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First Name*"
                    className={`input ${formik.touched.firstname && formik.errors.firstname ? "border-danger" : ""}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstname}
                  />
                  {formik.touched.firstname && formik.errors.firstname && (
                    <div className="text-danger small mt-1">{formik.errors.firstname}</div>
                  )}
                </div>
                <div className="col-md-6 col-12">
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name*"
                    className={`input ${formik.touched.lastname && formik.errors.lastname ? "border-danger" : ""}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastname}
                  />
                  {formik.touched.lastname && formik.errors.lastname && (
                    <div className="text-danger small mt-1">{formik.errors.lastname}</div>
                  )}
                </div>
                <div className="col-12">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    className={`input ${formik.touched.email && formik.errors.email ? "border-danger" : ""}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-danger small mt-1">{formik.errors.email}</div>
                  )}
                </div>
                <div className="col-12">
                  <input
                    type="password"
                    name="password"
                    placeholder="Set a Password*"
                    className={`input ${formik.touched.password && formik.errors.password ? "border-danger" : ""}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-danger small mt-1">{formik.errors.password}</div>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-end pt-3">
                <button type="submit" className="btn">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
