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
  const storedUser = localStorage.getItem("loggedInUser");
  if (!storedUser) {
    throw new Error("User not authenticated");
  }

  const { token } = JSON.parse(storedUser);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/username/${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    console.log(response);
    throw new Error("Failed to fetch user data");
  }

  return response.json();
};

const getAllUsers = async () => {
  const storedUser = localStorage.getItem("loggedInUser");
  if (!storedUser) {
    throw new Error("User not authenticated");
  }

  let token;
  try {
    token = JSON.parse(storedUser).token;
  } catch (error) {
    throw new Error("Failed to parse stored user");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

const UserService = {
  loginUser,
  getUserByUsername,
  getAllUsers,
};

export default UserService;
