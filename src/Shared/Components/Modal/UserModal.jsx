import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  addUserAsync,
  updateUserAsync,
  clearError,
} from "../../../Redux/Actions/userActions";
import Input from "../Input/Input";
import "./UserModal.css";

function UserModal({ id, singleuser, mode, isOpen, closeModal }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  function success() {
    closeModal();
    formik.resetForm();
  }
  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstName: singleuser?.firstName || "",
      lastName: singleuser?.lastName || "",
      email: singleuser?.email || "",
      password: singleuser?.password || "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      const action =
        mode === "updateUser"
          ? updateUserAsync({ ...values, id: singleuser?.id }, success)
          : addUserAsync(values, success);
      dispatch(action);
    },
  });

  const closeModalHandler = () => {
    closeModal();
    dispatch(clearError("addUser"));
    dispatch(clearError("updateUser"));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      role="dialog"
      id={id}
      aria-labelledby="addUserModalLabel"
      style={{ display: "block", backdropFilter: "blur(5px)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addUserModalLabel">
              {mode === "updateUser" ? "Update a User" : "Register a User"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModalHandler}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6 col-12">
                  <Input
                    name="firstName"
                    type="text"
                    placeholder="First Name*"
                    {...formik.getFieldProps("firstName")}
                    error={formik.errors.firstName}
                    touched={formik.touched.firstName}
                  />
                </div>
                <div className="col-md-6 col-12">
                  <Input
                    name="lastName"
                    type="text"
                    placeholder="Last Name*"
                    {...formik.getFieldProps("lastName")}
                    error={formik.errors.lastName}
                    touched={formik.touched.lastName}
                  />
                </div>
                <div className="col-12">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email*"
                    {...formik.getFieldProps("email")}
                    error={formik.errors.email}
                    touched={formik.touched.email}
                  />
                </div>
                <div className="col-12">
                  <Input
                    name="password"
                    type="password"
                    placeholder="Set a Password*"
                    {...formik.getFieldProps("password")}
                    error={formik.errors.password}
                    touched={formik.touched.password}
                  />
                </div>
              </div>

              {/* Display error message from Redux */}
              {error.addUser && (
                <div className="alert alert-danger mt-3">
                  <strong>Error:</strong> {error.addUser}
                </div>
              )}
              {error.updateUser && (
                <div className="alert alert-danger mt-3">
                  <strong>Error:</strong> {error.updateUser}
                </div>
              )}

              <div className="d-flex justify-content-end pt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading.addUser || loading.updateUser}
                >
                  {loading.addUser || loading.updateUser
                    ? "Saving..."
                    : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserModal;
