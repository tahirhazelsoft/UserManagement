// services.js
const BASE_URL = "https://dummyjson.com/users";

export const fetchUsers = async () => {
  const response = await fetch(`${BASE_URL}?limit=0&select=firstName,lastName,email,password`);
  const data = await response.json();
  return data.users;
};

export const deleteUser = async (id) => {
  await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};

export const updateUser = async (user) => {
  const response = await fetch(`${BASE_URL}/${user.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await response.json();
};

export const addUser = async (user) => {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await response.json();
};
