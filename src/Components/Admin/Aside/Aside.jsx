import React from "react";
import { NavLink } from "react-router-dom";
import "../CSS/Admin.css";
import home from "../../../assets/home.svg";
import user from "../../../assets/user.svg";
import dashboard from "../../../assets/dashboard.svg";

function Aside() {
  return (
    <aside className="aside-bar">
      <header className="text-center text-white pt-2 aside-header">
        <h1 className="d-none d-md-block">Dashboard</h1>
        <img src={dashboard} alt="home" width={50} className="d-md-none" />{" "}
        {/* Visible only on smaller screens */}
        <span className="aside-hr">
          <hr />
        </span>
      </header>

      <main className="nav flex-column w-100">
        <NavLink
          to=""
          end
          className={({ isActive }) =>
            isActive
              ? "nav-link active-link text-white p-3 m-md-3 display-6 "
              : "nav-link text-dark p-3 m-md-3 text-white"
          }
        >
          <div className="d-none d-md-block">
            <p>Home</p> 
          </div>
          <div className="d-md-none text-center">
            <img src={home} alt="home" width={50} />

          </div>
        </NavLink>
        <NavLink
          to="users"
          className={({ isActive }) =>
            isActive
              ? "nav-link active-link text-white p-3 m-md-3 display-6 "
              : "nav-link text-dark p-3 m-md-3 text-white"
          }
        >
          <div className="d-none d-md-block">
            <p>Users</p>
          </div>
          <div className="d-md-none text-center">
            <img src={user} alt="user" width={50} />
          </div>
        </NavLink>
      </main>
    </aside>
  );
}

export default Aside;
