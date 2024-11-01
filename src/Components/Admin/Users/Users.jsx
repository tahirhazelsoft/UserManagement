import React, { useState, useEffect } from "react";
import "../CSS/Admin.css";
import { useDispatch, useSelector } from "react-redux";
import AddUser from "./Modal/AddUser";
import { deleteUser, searchUser } from "../../../features/Users/userSlice";
import FilteredUser from "./FilteredUser/FilteredUser";
import { Link } from "react-router-dom";

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const searchedUsers = useSelector((state) => state.users.searchResult);
  const [user, setUser] = useState(null);
  const [showPasswordId, setShowPasswordId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortedUsers, setSortedUsers] = useState(users);
  const [monitorUsers, setMonitorUsers] = useState({
    start: 0,
    end: 5,
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      if (search) {
        setLoading(true);
        dispatch(searchUser(search));
        setLoading(false);
      } else {
        dispatch(searchUser(""));
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search, dispatch]);

  useEffect(() => {
    setSortedUsers(users);
  }, [users]);

  const handleShowPassword = (id) => {
    setShowPasswordId((prevId) => (prevId === id ? null : id));
  };

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleUpdate = (id) => {
    const findUser = users.find((user) => user.id === id);
    setUser(findUser);
    setIsUpdating(true);
  };

  const saveUser = () => {
    setUser(null);
    setIsUpdating(false);
  };

  const clearSearch = () => {
    setSearch("");
    dispatch(searchUser(""));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      clearSearch();
    }
  };

  const handleSortAscending = () => {
    console.log("Sorting in ascending order, please wait");
    const sorted = [...users].sort((a, b) => a.id - b.id);
    setSortedUsers(sorted);
    console.log(sorted);
  };

  const handleSortDescending = () => {
    console.log("Sorting in descending order, please wait");
    const sorted = [...users].sort((a, b) => b.id - a.id);
    setSortedUsers(sorted);
    console.log(sorted);
  };

  const handleNext = () => {
    setMonitorUsers({
      start: monitorUsers.start + 5,
      end: monitorUsers.end + 5,
    });
    console.log(monitorUsers.end, users.length)
  };

  const handlePrevious = () => {
    setMonitorUsers({
      start: monitorUsers.start - 5 < 0 ? 0 : monitorUsers.start - 5,
      end: monitorUsers.end - 5 < 5 ? 5 : monitorUsers.end - 5,
    });
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
              onKeyDown={handleKeyDown}
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
                : sortedUsers.slice(monitorUsers.start, monitorUsers.end)
            }
            showPasswordId={showPasswordId}
            handleShowPassword={handleShowPassword}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        )}
        <div className="pagination">
          <button onClick={handlePrevious} disabled={monitorUsers.start === 0}>
            Previous
          </button>
          <button onClick={handleNext} disabled={monitorUsers.end > users.length}>Next</button>
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
