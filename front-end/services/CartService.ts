const getCartItemsByUsername = async (username: string) => {
  const token = localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser")).token
    : null;
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const addProductToCart = async (
  username: string,
  product: { productId: string; quantity: number }
) => {
  const token = localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser")).token
    : null;
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/${username}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
};

const removeProductFromCart = async (username: string, productId: string) => {
  const token = localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser")).token
    : null;
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cart/${username}/${productId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const CartService = {
  getCartItemsByUsername,
  addProductToCart,
  removeProductFromCart,
};

export default CartService;
