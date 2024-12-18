const getProducts = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

const createProduct = async (productData: {
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

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  return response.json();
};

const deleteProduct = async (productId: number) => {
  const storedUser = localStorage.getItem("loggedInUser");
  if (!storedUser) {
    throw new Error("User not authenticated");
  }

  const { token } = JSON.parse(storedUser);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
};

const getCart = async () => {
  const storedUser = localStorage.getItem("loggedInUser");
  if (!storedUser) {
    throw new Error("User not authenticated");
  }

  const { token } = JSON.parse(storedUser);

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch cart: ${response.status} ${response.statusText}`
      );
      throw new Error("Failed to fetch cart");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
};

const updateCart = async (items: any) => {
  const storedUser = localStorage.getItem("loggedInUser");
  if (!storedUser) {
    throw new Error("User not authenticated");
  }

  const { token } = JSON.parse(storedUser);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ items }),
  });

  if (!response.ok) {
    throw new Error("Failed to update cart");
  }

  return response.json();
};

const ProductService = {
  getProducts,
  createProduct,
  deleteProduct, // Add deleteProduct to the ProductService
  getCart,
  updateCart,
};

export default ProductService;
