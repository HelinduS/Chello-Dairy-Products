'use client';

import Link from 'next/link';

const productData = [
    {
        id: 1,
        name: 'Fresh Milk (1L)',
        image: '/images/freshmilk.png',
        price: 'Rs. 250 / L',
        description: 'Pure, fresh cow milk straight from the farm, unprocessed and healthy.',
      },
    
    {
        id: 2,
        name: 'Yoghurt Drink With Basil Seeds (Mango Flavour 180ml)',
        image: '/images/mango.jpg',
        price: 'Rs. 250 / L',
        description: 'Tropical mango yoghurt blended with basil seeds for a refreshing boost.',
      },
      {
        id: 3,
        name: 'Yoghurt Drink With Basil Seeds (Strawberry Flavour 180ml)',
        image: '/images/strowberry.png',
        price: 'Rs. 250 / L',
        description: 'Creamy strawberry yoghurt with basil seeds – fruity and fun!',
      },
      {
        id: 4,
        name: 'Vanila flavored Yoghurt drink',
        image: '/images/Vanila.jpg',
        price: 'Rs. 250 / L',
        description: 'Smooth vanilla yoghurt drink, rich in calcium and flavor.',
      },
      {
        id: 5,
        name: 'Yoghurt Drink With Basil Seeds (Vanilla Flavour 180ml)',
        image: '/images/Vanila(basil).jpg',
        price: 'Rs. 250 / L',
        description: 'Classic vanilla yoghurt paired with basil seeds for extra nutrition.',
      },
      
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Available Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {productData.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-bold text-green-600 mb-4">{product.price}</p>
            <Link
              href={`/products/${product.id}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
