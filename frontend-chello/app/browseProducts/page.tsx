'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProductGrid from '@/components/ui/productsGrid';
import ProductSortDropdown from '@/components/ui/productSort';

const BrowseProductsPage = () => {
  const [sortBy, setSortBy] = useState('default');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Fixed Navbar */}
      <nav className="bg-blue-700 text-white px-4 py-3 shadow-sm fixed top-0 left-0 w-full z-50">
        <div className="flex items-center justify-between max-w-[95vw] sm:max-w-[90vw] mx-auto">
          <div className="text-xl sm:text-2xl font-bold">🧀 chello.dairy</div>
          <div className="flex items-center gap-4 text-sm sm:text-base">
            <Link href="/customer-dash" className="hover:underline">Home</Link>
            <Link href="/cart" className="hover:underline">Cart</Link>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/login';
              }}
              className="hover:underline"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* 🧱 Spacer to push content below fixed navbar */}
      <div className="h-16" />

      {/* 🏷️ Page Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto w-full max-w-[95vw] sm:max-w-[90vw] py-4 px-3 sm:px-4 lg:px-6">
          <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900">
            Browse Products
          </h1>
        </div>
      </header>

      {/* 📦 Main Content */}
      <main className="mx-auto w-full max-w-[95vw] sm:max-w-[90vw] py-4 sm:py-6 px-3 sm:px-4 lg:px-6">
        {/* ❤️ Favorites Section */}
        <section className="mb-6 sm:mb-8 lg:mb-10">
          <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
            Your Favorites
          </h2>
          <ProductGrid isFavoritesSection={true} />
        </section>

        {/* 🛍️ All Products Section */}
        <section>
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h2 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900">
              All Available Products
            </h2>
            <ProductSortDropdown sortBy={sortBy} onSortChange={setSortBy} />
          </div>
          <ProductGrid isFavoritesSection={false} sortBy={sortBy} />
        </section>
      </main>
    </div>
  );
};

export default BrowseProductsPage;
