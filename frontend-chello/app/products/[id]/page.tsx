"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

// ✅ Product Type
type Product = {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
  details: string;
  nutrition: string;
  rating: number;
  tag?: string; // Optional badge like #1 most liked
};

// ✅ Product List
const productData: Product[] = [
  {
    id: 1,
    name: "Fresh Cow Milk",
    image: "/images/mango.jpg",
    price: "Rs. 250 / L",
    description: "Rich in calcium, perfect for daily consumption.",
    details:
      "Freshly sourced from local dairy farms, this milk is unprocessed, pure, and packed with essential nutrients.",
    nutrition: "Calories: 150, Protein: 8g, Calcium: 300mg",
    rating: 4.5,
    tag: "#1 most liked",
  },
  {
    id: 2,
    name: "Organic Buffalo Milk",
    image: "/images/buffalo-milk.jpg",
    price: "Rs. 300 / L",
    description: "Creamy and nutrient-packed organic buffalo milk.",
    details:
      "Our organic buffalo milk is certified and tested. Best for making rich sweets like kheer and barfi.",
    nutrition: "Calories: 180, Protein: 9g, Calcium: 320mg",
    rating: 4.8,
    tag: "#2 most liked",
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

  const addToWishlist = () => {
    const existing: Product[] = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    const isAlreadyInWishlist = existing.some((p) => p.id === product.id);
    if (isAlreadyInWishlist) {
      alert("Product is already in your wishlist!");
      return;
    }

    existing.push(product);
    localStorage.setItem("wishlist", JSON.stringify(existing));
    alert("Added to wishlist!");
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} of ${product.name} to cart.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden lg:flex">
        {/* Image Section */}
        <div className="lg:w-1/2 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover lg:h-full"
          />
          {product.tag && (
            <span className="absolute top-3 left-3 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
              {product.tag}
            </span>
          )}
        </div>

        {/* Info Section */}
        <div className="lg:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-xl font-semibold text-cyan-700 mb-4">
              {product.price}
            </p>
            <p className="text-sm text-gray-700 mb-4">{product.details}</p>

            <div className="mb-4">
              <h2 className="font-semibold text-gray-700">Nutrition Facts:</h2>
              <p className="text-sm text-gray-600">{product.nutrition}</p>
            </div>

            <div className="mb-4">
              <h2 className="font-semibold text-gray-700">Customer Rating:</h2>
              <p className="text-yellow-500">
                {"⭐️".repeat(Math.round(product.rating))} ({product.rating})
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-24 px-3 py-2 border rounded shadow-sm"
                min={1}
              />
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="bg-cyan-700 text-white font-medium px-5 py-2 rounded-lg shadow hover:bg-cyan-800 transition"
            >
              Add {quantity > 1 ? `${quantity} Items` : "to Cart"}
            </button>

            <button
              onClick={addToWishlist}
              className="flex items-center gap-2 bg-pink-600 text-white font-medium px-5 py-2 rounded-lg shadow hover:bg-pink-700 transition"
            >
              <span>❤️</span>
              <span>Add to Wishlist</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
