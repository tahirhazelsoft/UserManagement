import React, { useState, useEffect } from "react";
import "../CSS/Admin.css";
import { useDispatch, useSelector } from "react-redux";
import AddUser from "./Modal/AddUser";
import { deleteUser, searchUser } from "../../../features/Users/userSlice";
import FilteredUser from "./FilteredUser/FilteredUser";

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const searchedUsers = useSelector((state) => state.users.searchResult);
  const [user, setUser] = useState(null);
  const [showPasswordId, setShowPasswordId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <section className="users">
      <header className="text-center mt-2">
        <h1>Here you can manage all the users</h1>
      </header>
      <hr />
      <main className="d-flex flex-column">
        <div className="add-button w-100 text-end d-flex justify-content-center gap-2 flex-sm-row flex-column justify-content-sm-end ">
          <div className="search d-flex">
            <input
              type="text"
              placeholder="Search User"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown} 
            />
            <button
              className={`searchBtn ${search ? '' : 'd-none'}`}
              onClick={clearSearch}
            >
              Clear
            </button>
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
            users={search ? searchedUsers : users}
            showPasswordId={showPasswordId}
            handleShowPassword={handleShowPassword}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
          />
        )}
      </main>

      {/* Modal Here */}
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
