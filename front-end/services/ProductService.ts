const getProducts = async () => {
  const token = localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser")).token
    : null;
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const createProduct = async (productData: {
  name: string;
  price: number;
  image: string;
  description: string;
}) => {
  const token = localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser")).token
    : null;
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(productData),
  });
};

const deleteProduct = async (productId: number) => {
  const token = localStorage.getItem("loggedInUser")
    ? JSON.parse(localStorage.getItem("loggedInUser")).token
    : null;
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    },
  });
};

const ProductService = {
  getProducts,
  createProduct,
  deleteProduct, // Add deleteProduct to the ProductService
};

export default ProductService;
