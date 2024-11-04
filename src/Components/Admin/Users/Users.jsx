import React, { useState, useEffect } from "react";
import "../CSS/Admin.css";
import AddUser from "./Modal/AddUser";
import FilteredUser from "./FilteredUser/FilteredUser";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersAsync,
  addUserAsync,
  deleteUserAsync,
  updateUserAsync,
  searchUser,
  UsersInAscendingOrder,
  UsersInDescendingOrder,
} from "../../../features/Users/userSlice";

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);
  const searchedUsers = useSelector((state) => state.users.searchResult);

  const [user, setUser] = useState(null);
  const [showPasswordId, setShowPasswordId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [search, setSearch] = useState("");
  const [monitorUsers, setMonitorUsers] = useState({ start: 0, end: 5 });
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  useEffect(() => {
    if (search) {
      dispatch(searchUser(search));
    }
  }, [search]);

  const allPages = Math.ceil(users.length / 5);

  const handleShowPassword = (id) => {
    setShowPasswordId((prevId) => (prevId === id ? null : id));
  };

  const handleDelete = async (id) => {
    dispatch(deleteUserAsync(id));
  };

  const handleUpdate = (id) => {
    const findUser = users.find((user) => user.id === id);
    setUser(findUser);
    setIsUpdating(true);
  };

  const saveUser = (newUser, mode) => {
    if (mode === "update") {
      dispatch(updateUserAsync(newUser));
    } else {
      dispatch(addUserAsync(newUser));
    }
    setUser(null);
    setIsUpdating(false);
  };

  const clearSearch = () => {
    setSearch("");
  };

  const handleSortAscending = () => {
    dispatch(UsersInAscendingOrder());
  };

  const handleSortDescending = () => {
    dispatch(UsersInDescendingOrder());
  };

  const handleNext = () => {
    setMonitorUsers({
      start: monitorUsers.start + 5,
      end: monitorUsers.end + 5,
    });
    setActivePage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setMonitorUsers({
      start: monitorUsers.start - 5 < 0 ? 0 : monitorUsers.start - 5,
      end: monitorUsers.end - 5 < 5 ? 5 : monitorUsers.end - 5,
    });
    setActivePage((prev) => prev - 1);
  };

  return (
    <section className="users">
      <header className="text-center mt-2">
        <h1>Here you can manage all the users</h1>
      </header>
      <hr />
      <main className="d-flex flex-column">
        <div className="add-button w-100 text-end d-flex justify-content-center gap-2 flex-sm-row flex-column justify-content-sm-end ">
          <div className="search d-flex justify-content-end">
            <input
              type="text"
              placeholder="Search User"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className={`searchBtn ${search ? "" : "d-none"}`}
              onClick={clearSearch}
            >
              Clear
            </button>
          </div>
          <div className="filter">
            <div className="dropdown">
              <button
                className=" dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Filter
              </button>

              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={handleSortAscending}
                  >
                    Sort in ascending
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={handleSortDescending}
                  >
                    Sort in descending
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="add-user">
            <button
              className="add-user"
              data-bs-toggle="modal"
              data-bs-target="#addUserModal"
              onClick={() => setIsUpdating(false)}
            >
              Add User
            </button>
          </div>
        </div>
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <FilteredUser
            users={
              search
                ? searchedUsers
                : users.slice(monitorUsers.start, monitorUsers.end)
            }
            showPasswordId={showPasswordId}
            handleShowPassword={handleShowPassword}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        )}
        <div className="pagination flex justify-content-between align-items-center">
          <button onClick={handlePrevious} disabled={monitorUsers.start === 0}>
            Previous
          </button>
          <div className="pages">
            <button
              className="FirstPage"
              onClick={() => {
                setMonitorUsers({ start: 0, end: 5 });
                setActivePage(1);
              }}
            >
              1
            </button>
            <button className="ActivePage">{activePage}</button>
            <button
              className="LastPage"
              onClick={() => {
                setMonitorUsers({
                  start: users.length - 5,
                  end: users.length,
                });
                setActivePage(allPages);
              }}
            >
              {allPages}
            </button>
          </div>
          <button
            onClick={handleNext}
            disabled={monitorUsers.end >= users.length}
          >
            Next
          </button>
        </div>
      </main>

      <AddUser id={"addUserModal"} mode={"add"} onSave={saveUser} />
      <AddUser
        id={"updateUserModal"}
        singleuser={user}
        mode={"update"}
        onSave={saveUser}
      />
    </section>
  );
}

export default Users;
