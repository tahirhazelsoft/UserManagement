import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Aside from "./Aside/Aside";
// import { logoutUserAsync } from "../../Redux/Actions/userActions";
import "./CSS/Admin.css";

function AdminLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  // const verifiedUser = useSelector((state) => state.user.verifiedUser);

  useEffect(() => {
    if (!loggedInUser) {
      console.warn("No valid access token found. Redirecting to home.");
      navigate("/");
    } else {
      // dispatch(verifyTokenAsync(loggedInUser));
      navigate("/admin");
    }
  }, [dispatch, loggedInUser, navigate]);

  useEffect(() => {
    // If verification failed (verifiedUser is null) and a user is logged in, log them out and redirect
    if (loggedInUser === null) {
      // dispatch(logoutUserAsync());
      navigate("/");
    }
  }, [loggedInUser, dispatch, navigate]);

  return (
    <div className="admin-layout">
      <div className="admin-aside">
        <Aside />
      </div>
      <div className="admin-outlet">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
