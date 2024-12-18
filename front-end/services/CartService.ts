const getCartItemsByUsername = async (username: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cart/${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch cart items");
  }
  const data = await response.json();
  return Array.isArray(data)
    ? data.map((item) => ({
        id: item.id,
        cartId: item.cartId,
        productId: item.productId,
        name: item.productName,
        description: item.productDescription,
        price: item.productPrice,
        image: item.productImage,
        quantity: item.quantity,
      }))
    : [];
};

const addProductToCart = async (
  username: string,
  product: { productId: string; quantity: number }
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cart/${username}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }
  );
  console.log(product);
  if (!response.ok) {
    throw new Error("Failed to add product to cart");
  }
  const data = await response.json();
  return data;
};

const removeProductFromCart = async (username: string, productId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cart/${username}/${productId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to remove product from cart");
  }
  const data = await response.json();
  return data;
};

const CartService = {
  getCartItemsByUsername,
  addProductToCart,
  removeProductFromCart,
};

export default CartService;
