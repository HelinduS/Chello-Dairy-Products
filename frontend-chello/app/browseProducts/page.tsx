import React from 'react';

const BrowseProductsPage = () => {
    const products = [
        { id: 1, name: 'Product 1', price: '$10' },
        { id: 2, name: 'Product 2', price: '$20' },
        { id: 3, name: 'Product 3', price: '$30' },
    ];

    return (
        <div>
            <header className="p-4 bg-gray-100 text-center">
                <h1 className="text-2xl font-bold">Browse Products</h1>
            </header>
            <main className="p-4">
            <div className="flex flex-col gap-4"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <div key={product.id} className="border p-4 rounded shadow-sm w-25 h-64">
                            <h2 className="text-lg font-semibold">{product.name}</h2>
                            <p className="text-gray-600">{product.price}</p>
                            <div className="mt-4 flex justify-between">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    Buy Now
                                </button>
                                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};


export default BrowseProductsPage;