import React, { useState } from "react";
import ProductService from "@services/ProductService";

interface AddProductFormProps {
  onProductAdded: () => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onProductAdded }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const productData = {
        name,
        price: parseFloat(price),
        image,
        description,
      };

      await ProductService.createProduct(productData);
      setStatusMessage("Product added successfully!");
      setIsSuccess(true);
      onProductAdded(); // Call the callback function
    } catch (error) {
      setStatusMessage("Failed to add product.");
      setIsSuccess(false);
      console.error("Error adding product:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-8 rounded shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Name:
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Price:
        </label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Image URL:
        </label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Description:
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </button>
      </div>
      {statusMessage && (
        <div
          className={`text-center text-sm ${
            isSuccess ? "text-green-500" : "text-red-500"
          }`}
        >
          {statusMessage}
        </div>
      )}
    </form>
  );
};

export default AddProductForm;
