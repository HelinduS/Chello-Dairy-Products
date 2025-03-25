"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

const productData = [
  {
    id: 1,
    name: "Fresh Cow Milk",
    image: "/images/mango.jpg",
    price: "Rs. 250 / L",
    description: "Rich in calcium, perfect for daily consumption.",
    details: "Freshly sourced from local dairy farms, this milk is unprocessed, pure, and packed with essential nutrients.",
    nutrition: "Calories: 150, Protein: 8g, Calcium: 300mg",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Organic Buffalo Milk",
    image: "/images/buffalo-milk.jpg",
    price: "Rs. 300 / L",
    description: "Creamy and nutrient-packed organic buffalo milk.",
    details: "Our organic buffalo milk is certified and tested. Best for making rich sweets like kheer and barfi.",
    nutrition: "Calories: 180, Protein: 9g, Calcium: 320mg",
    rating: 4.8,
  },
];

export default function ProductPage() {
  const params = useParams();
  const productId = Number(params.id);
  const product = productData.find((p) => p.id === productId);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="p-6">Product not found.</div>;
  }

  const handleAddToCart = () => {
    alert(`Added ${quantity} of ${product.name} to cart.`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded shadow-md overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold text-cyan-700 mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <p className="text-cyan-700 font-semibold mb-2">{product.price}</p>
          <p className="text-gray-800 mb-4">{product.details}</p>

          <div className="mb-4">
            <h2 className="font-semibold text-gray-700">Nutrition Facts:</h2>
            <p className="text-sm text-gray-600">{product.nutrition}</p>
          </div>

          <div className="mb-4">
            <h2 className="font-semibold text-gray-700">Customer Rating:</h2>
            <p className="text-yellow-500">{"⭐️".repeat(Math.round(product.rating))} ({product.rating})</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-24 px-3 py-2 border rounded"
              min={1}
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-cyan-700 text-white px-5 py-2 rounded hover:bg-cyan-600"
          >
            Add {quantity > 1 ? `${quantity} Items` : "to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
