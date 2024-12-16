import React from "react";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  image,
  description,
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
      <div className="px-6 pt-4 pb-2">
        <span className="text-gray-900 font-bold text-xl">€{price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
