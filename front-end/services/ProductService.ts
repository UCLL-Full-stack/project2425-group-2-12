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

const ProductService = {
  getProducts,
  createProduct,
  deleteProduct, // Add deleteProduct to the ProductService
  getCart,
};

export default ProductService;
