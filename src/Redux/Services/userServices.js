import axios from "axios";

const BASE_URL = "https://dummyjson.com/users";

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        limit: 0,
        select: "firstName,lastName,email,password",
      },
    });
    console.log("API response:", response.data);
    return response.data.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const updateUser = async (user) => {
  try {
    const response = await axios.put(`${BASE_URL}/${user.id}`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const addUser = async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/add`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};
export const LogInUser = async (email, password) => {
  try {
    const response = await axios.post(
      `/api/auth/login`,
      {
        username: email,
        password: password,
        expiresInMins: 30,
      },
      {
        withCredentials: true, 
      }
    );
    console.log("Token Data: ", response.data);
    const token = response.data.accessToken;
    localStorage.setItem("authToken", token);

    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};


