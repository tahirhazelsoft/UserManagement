// import React, { useState, useEffect } from "react";
// import "../CSS/Admin.css";
// import FilteredUser from "./FilteredUser/FilteredUser";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchUsersAsync,
//   deleteUserAsync,
//   searchUser,
//   sortUsersAscending,
//   sortUsersDescending,
//   clearError,
// } from "../../../Redux/Actions/userActions";
// import Pagination from "react-js-pagination";
// import UserModal from "../../../Shared/Components/Modal/UserModal";

// function Users() {
//   const dispatch = useDispatch();
//   const { users, loading, error, searchResult } = useSelector(
//     (state) => state.user
//   );
//   const [user, setUser] = useState(null);
//   const [showPasswordId, setShowPasswordId] = useState(null);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   //new state
//   const [isOpen, setIsOpen] = useState(false);
//   // new functions
//   const handleClose = () => {
//     setIsOpen(false);
//     setUser(null);
//   };
//   const handleOpen = () => {
//     setIsOpen(true);
//   };

//   const displayedUsers = (search ? searchResult : users).slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   useEffect(() => {
//     dispatch(fetchUsersAsync());
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(searchUser(search));
//     setCurrentPage(1);
//   }, [search, dispatch]);

//   useEffect(() => {
//     if (error) {
//       setTimeout(() => dispatch(clearError()), 5000);
//     }
//   }, [error, dispatch]);

//   return (
//     <section className="users">
//       <header className="text-center mt-2">
//         <h1>Here you can manage all the users</h1>
//       </header>
//       <hr />
//       <main className="d-flex flex-column">
//         <div className="add-button w-100 text-end d-flex justify-content-center gap-2 flex-sm-row flex-column justify-content-sm-end">
//           <div className="search d-flex justify-content-end">
//             <input
//               type="text"
//               placeholder="Search User"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//             <button
//               className={`searchBtn ${search ? "" : "d-none"}`}
//               onClick={() => setSearch("")}
//             >
//               Clear
//             </button>
//           </div>
//           <div className="filter">
//             <div className="dropdown">
//               <button
//                 className="dropdown-toggle"
//                 role="button"
//                 data-bs-toggle="dropdown"
//                 aria-expanded="false"
//               >
//                 Filter
//               </button>
//               <ul className="dropdown-menu">
//                 <li>
//                   <button
//                     className="dropdown-item"
//                     onClick={() => dispatch(sortUsersAscending())}
//                   >
//                     Sort in ascending
//                   </button>
//                 </li>
//                 <li>
//                   <button
//                     className="dropdown-item"
//                     onClick={() => dispatch(sortUsersDescending())}
//                   >
//                     Sort in descending
//                   </button>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <button
//             className="add-user"

//             onClick={() => {
//               setIsUpdating(false);
//               setUser(null);
//               handleOpen();
//             }}
//           >
//             Add User
//           </button>
//         </div>

//         {loading.fetchUser ? (
//           <div className="loading">Loading users...</div>
//         ) : (
//           <FilteredUser
//             users={displayedUsers}
//             showPasswordId={showPasswordId}
//             handleShowPassword={(id) =>
//               setShowPasswordId(id === showPasswordId ? null : id)
//             }
//             handleDelete={(id) => dispatch(deleteUserAsync(id))}
//             handleUpdate={(id) => {
//               setUser(users.find((user) => user.id === id));
//               setIsUpdating(true);
//             }}
//             setIsOpen={setIsOpen}
//             deleteLoading={loading.deleteUser}
//             isOpen={isOpen}
//           />
//         )}

//         <Pagination
//           activePage={currentPage}
//           itemsCountPerPage={itemsPerPage}
//           totalItemsCount={(search ? searchResult : users).length}
//           pageRangeDisplayed={5}
//           onChange={(page) => setCurrentPage(page)}
//           innerClass="pagination d-flex justify-content-center mt-4"
//           activeClass="active-page"
//           itemClass="page-item"
//           linkClass="page-link"
//         />
//       </main>

//       <UserModal
//         id="addUserModal"
//         mode="addUser"
//         isOpen={isOpen}
//         closeModal={handleClose} 
//       />
//       <UserModal
//         id="updateUserModal"
//         singleuser={user}
//         mode="updateUser"
//         isOpen={isOpen}
//         closeModal={handleClose}
//       />

//     </section>
//   );
// }

// export default Users;


























import React, { useState, useEffect } from "react";
import "../CSS/Admin.css";
import FilteredUser from "./FilteredUser/FilteredUser";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersAsync,
  deleteUserAsync,
  searchUser,
  sortUsersAscending,
  sortUsersDescending,
  clearError,
} from "../../../Redux/Actions/userActions";
import Pagination from "react-js-pagination";
import UserModal from "../../../Shared/Components/Modal/UserModal";

function Users() {
  const dispatch = useDispatch();
  const { users, loading, error, searchResult } = useSelector(
    (state) => state.user
  );
  const [user, setUser] = useState(null);
  const [showPasswordId, setShowPasswordId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setUser(null); // Reset user on close
  };
  
  const handleOpenAddUser = () => {
    setIsUpdating(false);
    setUser(null);
    setIsOpen(true);
  };
  
  const handleOpenUpdateUser = (id) => {
    setUser(users.find((user) => user.id === id));
    setIsUpdating(true);
    setIsOpen(true);
  };

  const displayedUsers = (search ? searchResult : users).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(searchUser(search));
    setCurrentPage(1);
  }, [search, dispatch]);



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
              onClick={() => setSearch("")}
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
                    onClick={() => dispatch(sortUsersAscending())}
                  >
                    Sort in ascending
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => dispatch(sortUsersDescending())}
                  >
                    Sort in descending
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <button
            className="add-user"
            onClick={handleOpenAddUser}
          >
            Add User
          </button>
        </div>

        {loading.fetchUser ? (
          <div className="loading">Loading users...</div>
        ) : (
          <FilteredUser
            users={displayedUsers}
            showPasswordId={showPasswordId}
            handleShowPassword={(id) =>
              setShowPasswordId(id === showPasswordId ? null : id)
            }
            handleDelete={(id) => dispatch(deleteUserAsync(id))}
            handleUpdate={handleOpenUpdateUser} // Call update function here
            deleteLoading={loading.deleteUser}
          />
        )}

        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={(search ? searchResult : users).length}
          pageRangeDisplayed={5}
          onChange={(page) => setCurrentPage(page)}
          innerClass="pagination d-flex justify-content-center mt-4"
          activeClass="active-page"
          itemClass="page-item"
          linkClass="page-link"
        />
      </main>

      <UserModal
        id={isUpdating ? "updateUserModal" : "addUserModal"}
        mode={isUpdating ? "updateUser" : "addUser"}
        singleuser={user}
        isOpen={isOpen}
        closeModal={handleClose} 
      />
    </section>
  );
}

export default Users;
