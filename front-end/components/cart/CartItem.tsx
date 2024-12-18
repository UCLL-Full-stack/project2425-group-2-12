import React from "react";
import { useTranslation } from "next-i18next";
import ProductService from "@services/ProductService";

interface CartItemProps {
  item: {
    name: string;
    price: number;
    image: string;
    description: string;
  };
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const { t } = useTranslation();

  const handleRemove = async () => {
    await ProductService.updateCart();
    onRemove();
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4">
      <div className="w-full h-64">
        <img
          className="w-full h-full object-cover"
          src={item.image}
          alt={item.name}
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{item.name}</div>
        <p className="text-gray-700 text-base">{item.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2 flex justify-between items-center">
        <span className="text-gray-900 font-bold text-xl">€{item.price}</span>
        <button
          onClick={handleRemove}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          {t("cart.remove")}
        </button>
      </div>
    </div>
  );
};

export default CartItem;
