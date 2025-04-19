'use client';

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
    id: 2,
    name: "Yoghurt Drink With Basil Seeds (Mango Flavour 180ml)",
    image: "/images/mango.jpg",
    price: "Rs. 250 / L",
    description: "Perfect for daily consumption, rich in calcium.",
    details: "Mango flavour yoghurt drink with basil seeds, packed with nutrients.",
    nutrition: "Calories: 140, Protein: 6g, Calcium: 280mg",
    rating: 4.6,
    tag: "#1 most liked",
  },
  {
    id: 4,
    name: "Vanila flavored Yoghurt drink",
    image: "/images/Vanila.jpg",
    price: "Rs. 250 / L",
    description: "Perfect for daily consumption, rich in calcium.",
    details: "Vanilla flavored probiotic yoghurt drink — smooth, light and healthy.",
    nutrition: "Calories: 130, Protein: 5g, Calcium: 260mg",
    rating: 4.3,
    tag: "#2 most liked",
  },
  {
    id: 5,
    name: "Yoghurt Drink With Basil Seeds (Vanila Flavour 180ml)",
    image: "/images/Vanila(basil).jpg",
    price: "Rs. 250 / L",
    description: "Perfect for daily consumption, rich in calcium.",
    details: "Vanilla yoghurt blended with nutritious basil seeds for enhanced refreshment.",
    nutrition: "Calories: 135, Protein: 5.5g, Calcium: 270mg",
    rating: 4.4,
  },
  {
    id: 3,
    name: "Yoghurt Drink With Basil Seeds (Stroberry Flavour 180ml)",
    image: "/images/strowberry.png",
    price: "Rs. 250 / L",
    description: "Perfect for daily consumption, rich in calcium.",
    details: "Strawberry flavored yoghurt infused with basil seeds, creamy and delicious.",
    nutrition: "Calories: 145, Protein: 6g, Calcium: 290mg",
    rating: 4.5,
  },
  {
    id: 1,
    name: "Fresh Milk",
    image: "/images/freshmilk.png",
    price: "Rs. 250 / L",
    description: "Perfect for daily consumption, rich in calcium.",
    details: "Fresh farm milk — unprocessed, pure and full of essential nutrients.",
    nutrition: "Calories: 150, Protein: 8g, Calcium: 300mg",
    rating: 4.7,
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
              className="bg-cyan-700 text-white font-medium px-5 py-2 rounded-lg shadow hover:bg-cyan-800 transition"
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