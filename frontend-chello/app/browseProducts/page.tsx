 "use client";

import React, { useState } from 'react';
import ProductGrid from '@/components/ui/productsGrid';
import ProductSortDropdown from "@/components/ui/productSort"

const BrowseProductsPage = () => {
  const [sortBy, setSortBy] = useState("default");

  return (
    <div>
      <header className="p-4 bg-gray-100 text-center">
        <h1 className="text-2xl font-bold">Browse Products</h1>
      </header>
      <main className="p-4 max-w-6xl mx-auto">
        {/* Pass the sortBy state and setSortBy to the ProductSortDropdown */}
        <ProductSortDropdown sortBy={sortBy} onSortChange={setSortBy} />
        
        {/* Pass the sortBy prop to ProductGrid to control sorting */}
        <ProductGrid sortBy={sortBy} />
      </main>
    </div>
  );
};

export default BrowseProductsPage;