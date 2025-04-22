import ProductGrid from '@/components/ui/productsGrid';

const BrowseProductsPage = () => {
  return (
    <div>
      <header className="p-4 bg-gray-100 text-center">
        <h1 className="text-2xl font-bold">Browse Products</h1>
      </header>
      <main className="p-4 max-w-6xl mx-auto">
        <ProductGrid />
      </main>
    </div>
  );
};

export default BrowseProductsPage;
