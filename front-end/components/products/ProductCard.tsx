import React from "react";

interface ProductCardProps {
  name: string;
  price: string;
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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.4 5M17 13l1.4 5M9 21h6M9 21a2 2 0 11-4 0M15 21a2 2 0 104 0"
            ></path>
          </svg>
          <span>Add to Cart</span>
        </button>
        {isAdmin && (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center ml-2"
            onClick={onDelete}
          >
            <span>X</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
