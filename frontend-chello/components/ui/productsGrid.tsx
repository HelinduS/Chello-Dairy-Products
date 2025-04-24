'use client';

import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  stock: number;
}

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'An error occurred');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded shadow-sm w-64 h-full flex flex-col">
          {/* Image Section */}
          {product.image && (
            <div className="w-full h-40 bg-gray-200 overflow-hidden rounded-md mt-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain" // changed to object-contain
              />
            </div>
          )}
          
          {/* Product Name and Price */}
          <div className="flex flex-col flex-grow justify-between mt-4">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">{product.price}</p>
            <p className={`mt-1 text-sm ${product.stock >= 10 ? 'text-green-600' : '!text-red-500'}`}> {
                 product.stock >= 10 ? `In Stock (${product.stock})` : 'Out of Stock'}</p>
          </div>

         {/* Buttons Section */}
         <div className="mt-4 flex justify-between">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50" 
          disabled={product.stock < 10}>
                 Buy Now
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          disabled={product.stock < 10}>
                Add to Cart
          </button>
        </div>
      </div>
      ))}
    </div>
  );
};

export default ProductGrid;