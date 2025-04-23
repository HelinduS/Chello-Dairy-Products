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
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Favorites</h2>
          <ProductGrid isFavoritesSection={true} />
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">All Available Products</h2>
          <ProductGrid isFavoritesSection={false} />
        </section>
      </main>
    </div>
  );
};

export default BrowseProductsPage;