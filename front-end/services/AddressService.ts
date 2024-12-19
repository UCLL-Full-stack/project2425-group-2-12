import { Address } from "@types";

const getAddressByUsername = async (username: string): Promise<Address> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/address/${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch address");
  }
  return response.json();
};

const updateAddressByUsername = async (username: string, address: Address) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/address/${username}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update address");
  }
  return response.json();
};

const AddressService = {
  getAddressByUsername,
  updateAddressByUsername,
};

export default AddressService;
