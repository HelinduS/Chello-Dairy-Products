"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  image: string;
  price: string;
  description: string;
};

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Fresh Cow Milk",
    image: "/images/mango.jpg",
    price: "Rs. 250 / L",
    description: "Rich in calcium, perfect for daily consumption.",
  },
  {
    id: 2,
    name: "Organic Buffalo Milk",
    image: "/images/buffalo-milk.jpg",
    price: "Rs. 300 / L",
    description: "Creamy and nutrient-packed organic buffalo milk.",
  },
  {
    id: 3,
    name: "Flavored Milk – Chocolate",
    image: "/images/chocolate-milk.jpg",
    price: "Rs. 120 / 500ml",
    description: "Delicious chocolate milk for kids and adults.",
  },
  {
    id: 4,
    name: "Strawberry Milk",
    image: "/images/strawberry-milk.jpg",
    price: "Rs. 120 / 500ml",
    description: "Sweet and refreshing strawberry-flavored milk.",
  },
  {
    id: 5,
    name: "Ghee",
    image: "/images/ghee.jpg",
    price: "Rs. 550 / 500g",
    description: "Pure desi ghee made from traditional methods.",
  },
  {
    id: 6,
    name: "Paneer (Cottage Cheese)",
    image: "/images/paneer.jpg",
    price: "Rs. 350 / 500g",
    description: "Soft and fresh paneer perfect for cooking.",
  },
];

export default function Dashboard() {
  const [products] = useState<Product[]>(sampleProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (product: Product) => {
    router.push(`/products/${product.id}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">


      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-cyan-700">Milk Products</h1>

          {/* Top Right Buttons */}
          
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="bg-white shadow rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.description}</p>
                <div className="mt-2 font-bold text-cyan-700">{product.price}</div>
              </div>
            </div>
          ))}
          {filteredProducts.length === 0 && (
            <p className="col-span-full text-gray-500 text-center">No products found.</p>
          )}
        </div>
      </main>
    </div>
  );
}