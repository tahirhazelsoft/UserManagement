import React from "react";
import hide from "../../../../assets/hide.svg";
import show from "../../../../assets/show.svg";
import updateIcon from "../../../../assets/update.svg";
import deleteIcon from "../../../../assets/delete.svg";
function FilteredUser({
  users,
  showPasswordId,
  handleShowPassword,
  handleDelete,
  handleUpdate,
}) {
  return (
    <div className="table-wrapper m-3">
      {users && users.length > 0 ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Sr no</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  {showPasswordId === user.id ? (
                    <span className="d-flex align-items-center">
                      {user.password}
                      <img
                        src={hide}
                        alt="hide"
                        onClick={() => handleShowPassword(user.id)}
                        width={25}
                      />
                    </span>
                  ) : (
                    <span className="d-flex align-items-center">
                      {"******"}
                      <img
                        src={show}
                        alt="show"
                        onClick={() => handleShowPassword(user.id)}
                        width={25}
                      />
                    </span>
                  )}
                </td>
                <td className="">
                  <div className="d-flex justify-content-center gap-1">
                  <img
                    src={updateIcon}
                    alt="update"
                    width={25}
                    onClick={() => handleUpdate(user.id)}
                    data-bs-toggle="modal"
                    data-bs-target="#updateUserModal"
                  />
                  <img
                    src={deleteIcon}
                    alt="delete"
                    width={25}
                    onClick={() => handleDelete(user.id)}
                  />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        "No User found"
      )}
    </div>
  );
}

export default FilteredUser;
