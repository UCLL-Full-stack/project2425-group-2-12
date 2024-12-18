import React from "react";
import { useTranslation } from "next-i18next";

interface CartItemProps {
  item: {
    name: string;
    price: number;
    description: string;
  };
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const { t } = useTranslation();

  const handleRemove = async () => {
    console.log("Removing item from cart");
    onRemove();
  };

  return (
    <div className="flex justify-between items-center p-4 border-b">
      <div>
        <div className="font-bold text-xl">{item.name}</div>
        <p className="text-gray-700">{item.description}</p>
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
