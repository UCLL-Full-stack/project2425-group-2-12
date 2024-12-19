import { User } from "@types";

const loginUser = (user: User) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const getUserByUsername = async (username: string) => {
  const token = localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser")).token
    : null;
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/username/${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const getAllUsers = async () => {
  const token = localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser")).token
    : null;
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const UserService = {
  loginUser,
  getUserByUsername,
  getAllUsers,
};

export default UserService;
