import ProductCardSkeleton from '@/components/common/ProductCardSkeleton';

export default function Loading() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-10">Explore Our Products</h1>
      <div className="w-full p-3 border rounded-lg mb-8 bg-gray-100 animate-pulse h-12"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </main>
  );
}