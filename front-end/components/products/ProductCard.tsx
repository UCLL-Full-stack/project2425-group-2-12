import React from "react";
import { useTranslation } from "next-i18next";
import ProductService from "@services/ProductService";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  description: string;
  isAdmin: boolean;
  onDelete: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  image,
  description,
  isAdmin,
  onDelete,
}) => {
  const { t } = useTranslation();

  const handleAddToCart = async () => {
    try {
      const storedCart = localStorage.getItem("cart");
      const cart = storedCart ? JSON.parse(storedCart) : [];
      cart.push({ name, price, image, description });
      localStorage.setItem("cart", JSON.stringify(cart));

      // Update the cart in the backend
      await ProductService.updateCart(cart);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4">
      <div className="w-full h-64">
        <img className="w-full h-full object-cover" src={image} alt={name} />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <span className="text-gray-900 font-bold text-xl">€{price}</span>
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {t("product.addToCart")}
        </button>
        {isAdmin && (
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            X
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
