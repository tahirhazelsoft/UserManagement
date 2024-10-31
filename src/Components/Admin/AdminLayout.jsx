import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Aside from "./Aside/Aside";
import "./CSS/Admin.css";

function AdminLayout() {
  const navigate = useNavigate();
  const authenticatedUser = useSelector((state) => state.users.LoggedInUser);

 
  useEffect(() => {
    if (!authenticatedUser || authenticatedUser.length === 0) {
      navigate("/"); 
    }
  }, [authenticatedUser, navigate]); 

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
