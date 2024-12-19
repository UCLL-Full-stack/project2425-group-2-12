import { Address } from "@types";

const getAddressByUsername = async (username: string) => {
  const token = localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser")).token
    : null;
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/address/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateAddressByUsername = async (username: string, address: Address) => {
  const token = localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser")).token
    : null;
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/address/${username}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(address),
  });
};

const AddressService = {
  getAddressByUsername,
  updateAddressByUsername,
};

export default AddressService;
