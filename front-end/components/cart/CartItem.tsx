import React from "react";
import { useTranslation } from "next-i18next";

interface CartItemProps {
  item: {
    id: number;
    cartId: number;
    productId: number;
    name: string;
    description: string;
    price: number;
    image: string;
    quantity: number;
  };
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const { t } = useTranslation();

  const handleRemove = async () => {
    onRemove();
  };

  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center">
        <span className="text-gray-900 font-bold text-xl mr-4">
          {item.quantity}x
        </span>
        <div>
          <div className="font-bold text-xl">{item.name}</div>
          <p className="text-gray-700">{item.description}</p>
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-gray-900 font-bold text-xl mr-4">
          €{item.price}
        </span>
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
