import React, { useState, useEffect } from "react";
import "../CSS/Admin.css";
import AddUser from "./Modal/AddUser";
import FilteredUser from "./FilteredUser/FilteredUser";
import {
  fetchUsers,
  deleteUser,
  updateUser,
  addUser,
} from "../../../Services/UserService";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [showPasswordId, setShowPasswordId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [monitorUsers, setMonitorUsers] = useState({
    start: 0,
    end: 5,
  });
  const [activePage, setActivePage] = useState(1);
  const allPages = Math.round(users.length / 5);

  console.log(allPages);

  useEffect(() => {
    handleFetchUsers();
  }, []);

  const handleFetchUsers = async () => {
    setLoading(true);
    const users = await fetchUsers();
    setUsers(users);
    setSortedUsers(users);
    setLoading(false);
  };

  useEffect(() => {
    if (search) {
      setLoading(true);
      const filtered = users.filter((user) =>
        user.firstName.toLowerCase().includes(search.toLowerCase())
      );
      setSearchedUsers(filtered);
      setLoading(false);
    } else {
      setSearchedUsers([]);
    }
  }, [search, users]);

  const handleShowPassword = (id) => {
    setShowPasswordId((prevId) => (prevId === id ? null : id));
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
    setSortedUsers(users.filter((user) => user.id !== id));
  };

  const handleUpdate = (id) => {
    const findUser = users.find((user) => user.id === id);
    setUser(findUser);
    setIsUpdating(true);
  };

  const saveUser = async (newUser, mode) => {
    if (mode === "update") {
      const updatedUser = await updateUser(newUser);
      setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
      setSortedUsers(
        users.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
    } else {
      const addedUser = await addUser(newUser);
      setUsers([addedUser, ...users]);
      setSortedUsers([addedUser, ...users]);
    }
    setUser(null);
    setIsUpdating(false);
  };

  const clearSearch = () => {
    setSearch("");
  };

  const handleSortAscending = () => {
    const sorted = [...users].sort((a, b) => a.id - b.id);
    setSortedUsers(sorted);
  };

  const handleSortDescending = () => {
    const sorted = [...users].sort((a, b) => b.id - a.id);
    setSortedUsers(sorted);
  };

  const handleNext = () => {
    setMonitorUsers({
      start: monitorUsers.start + 5,
      end: monitorUsers.end + 5,
    });
    setActivePage((pre) => pre + 1);
  };

  const handlePrevious = () => {
    setMonitorUsers({
      start: monitorUsers.start - 5 < 0 ? 0 : monitorUsers.start - 5,
      end: monitorUsers.end - 5 < 5 ? 5 : monitorUsers.end - 5,
    });
    setActivePage((pre) => pre - 1);
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
                  start: Math.floor(users.length / 5) * 5,
                  end: users.length,
                });
                setActivePage(allPages);
              }}
            >
              Last page
            </button>
          </div>
          <button
            onClick={handleNext}
            disabled={monitorUsers.end > users.length}
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
