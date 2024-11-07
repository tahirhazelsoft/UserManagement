// import { useFormik } from "formik";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import * as Yup from "yup";
// import {
//   addUserAsync,
//   updateUserAsync,
// } from "../../../Redux/Actions/userActions";
// import Input from "../Input/Input";

// function UserModal({ id, singleuser, mode }) {
//   const dispatch = useDispatch();
//   const loading = useSelector((state)=>state.user.loading)
//   const error = useSelector((state)=>state.user.error)
//   console.log(loading)
//   const formik = useFormik({
//     initialValues: {
//       firstName: singleuser?.firstName || "",
//       lastName: singleuser?.lastName || "",
//       email: singleuser?.email || "",
//       password: singleuser?.password || "",
//     },
//     validationSchema: Yup.object({
//       firstName: Yup.string().required("First Name is required"),
//       lastName: Yup.string().required("Last Name is required"),
//       email: Yup.string()
//         .email("Invalid email address")
//         .required("Email is required"),
//       password: Yup.string()
//         .min(6, "Password must be at least 6 characters")
//         .required("Password is required"),
//     }),
//     enableReinitialize: true,
//     onSubmit: (values) => {
//       if (mode === "update") {
//         error.updateUser ? null : dispatch(updateUserAsync({ ...values, id: singleuser?.id }));
//       } else {
//         error.addUser ? null : dispatch(addUserAsync(values));
//       }

//       formik.resetForm();
//     },
//   });

//   return (
//     <div
//       className="modal fade"
//       id={id}
//       tabIndex="-1"
//       aria-labelledby="addUserModalLabel"
//       aria-hidden="true"
//     >
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title" id="addUserModalLabel">
//               {mode === "update" ? "Update a User" : "Register a User"}
//             </h5>
//             <button
//               type="button"
//               className="btn-close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//             ></button>
//           </div>
//           <div className="modal-body">
//             <form onSubmit={formik.handleSubmit}>
//               <div className="row g-3">
//                 <div className="col-md-6 col-12">
//                   <Input
//                     name="firstName"
//                     type="text"
//                     placeholder="First Name*"
//                     {...formik.getFieldProps("firstName")}
//                     error={formik.errors.firstName}
//                     touched={formik.touched.firstName}
//                   />
//                 </div>
//                 <div className="col-md-6 col-12">
//                   <Input
//                     name="lastName"
//                     type="text"
//                     placeholder="Last Name*"
//                     {...formik.getFieldProps("lastName")}
//                     error={formik.errors.lastName}
//                     touched={formik.touched.lastName}
//                   />
//                 </div>
//                 <div className="col-12">
//                   <Input
//                     name="email"
//                     type="email"
//                     placeholder="Email*"
//                     {...formik.getFieldProps("email")}
//                     error={formik.errors.email}
//                     touched={formik.touched.email}
//                   />
//                 </div>
//                 <div className="col-12">
//                   <Input
//                     name="password"
//                     type="password"
//                     placeholder="Set a Password*"
//                     {...formik.getFieldProps("password")}
//                     error={formik.errors.password}
//                     touched={formik.touched.password}
//                   />
//                 </div>
//               </div>
//               <div className="d-flex justify-content-end pt-3">
//                 <button
//                   type="submit"
//                   className="btn"
//                 //   data-bs-dismiss="modal"
//                 //   aria-label="Close"
//                 >
//                   {loading.addUser || loading.updateUser ? "Saving" : "Save Changes"}

//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserModal;



























import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { addUserAsync, updateUserAsync } from "../../../Redux/Actions/userActions";
import Input from "../Input/Input";

function UserModal({ id, singleuser, mode }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  const [isModalOpen, setIsModalOpen] = useState(true);

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
      if (mode === "update") {
        dispatch(updateUserAsync({ ...values, id: singleuser?.id }));
      } else {
        dispatch(addUserAsync(values));
      }
      formik.resetForm();
    },
  });

  useEffect(() => {
    if ((!error.updateUser && mode === "update") || (!error.addUser && mode === "add")) {
      setIsModalOpen(false);
    }
  }, [error, mode]);

  return (
    <div
      className={`modal fade ${isModalOpen ? "show" : ""}`}
      style={{ display: isModalOpen ? "block" : "none" }}
      id={id}
      tabIndex="-1"
      aria-labelledby="addUserModalLabel"
      aria-hidden={!isModalOpen}
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
              onClick={() => setIsModalOpen(false)}
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
              <div className="d-flex justify-content-end pt-3">
                <button type="submit" className="btn">
                  {loading.addUser || loading.updateUser ? "Saving" : "Save Changes"}
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
