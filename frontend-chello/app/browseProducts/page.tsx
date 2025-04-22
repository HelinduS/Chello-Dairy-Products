import ProductGrid from '@/components/ui/productsGrid';

const BrowseProductsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Products</h1>
        </div>
      </header>
      <main className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <ProductGrid />
      </main>
    </div>
  );
};

export default BrowseProductsPage;