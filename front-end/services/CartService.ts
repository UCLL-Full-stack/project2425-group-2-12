const getCart = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error(
      `Failed to fetch cart: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

export const addToCart = async (productData: {
  name: string;
  price: number;
  image: string;
  description: string;
}) => {
  const storedUser = localStorage.getItem("loggedInUser");
  if (!storedUser) {
    throw new Error("User not authenticated");
  }

  const { token } = JSON.parse(storedUser);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error("Failed to add product to cart");
  }

  return response.json();
};

const CartService = {
  getCart,
  addToCart,
};

export default CartService;
