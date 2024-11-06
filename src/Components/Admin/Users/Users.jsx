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
  sortUsersAscending,
  sortUsersDescending,
} from "../../../Redux/Actions/userActions";
import Pagination from "react-js-pagination";

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const searchedUsers = useSelector((state) => state.user.searchResult);
  const [user, setUser] = useState(null);
  const [showPasswordId, setShowPasswordId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  console.log(`Searched users are on User Components`, searchedUsers)
  const allUsers = search ? searchedUsers : users;
  const start = (currentPage - 1) * itemsPerPage;
  const end = currentPage * itemsPerPage;
  const displayedUsers = allUsers.slice(start, end);
  

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  useEffect(() => {
    if (search) {
      dispatch(searchUser(search));
    } else {
      dispatch(searchUser(""));
    }
  }, [search, dispatch]);

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
    dispatch(sortUsersAscending());
  };

  const handleSortDescending = () => {
    dispatch(sortUsersDescending());
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="users">
      <header className="text-center mt-2">
        <h1>Here you can manage all the users</h1>
      </header>
      <hr />
      <main className="d-flex flex-column">
        <div className="add-button w-100 text-end d-flex justify-content-center gap-2 flex-sm-row flex-column justify-content-sm-end">
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
                className="dropdown-toggle"
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
          <div className="loading ">Loading...</div>
        ) : (
          <FilteredUser
            users={displayedUsers}
            showPasswordId={showPasswordId}
            handleShowPassword={handleShowPassword}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        )}
        {error && <div className="error">{error}</div>}

        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={allUsers.length}
          pageRangeDisplayed={5} //how much page display?
          onChange={handlePageChange}
          innerClass="pagination d-flex justify-content-center mt-4"
          activeClass="active-page"
          itemClass="page-item"
          linkClass="page-link"
        />
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
