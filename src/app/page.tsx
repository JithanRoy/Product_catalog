
import { getAllProducts } from "@/lib/api/products";
import ProductList from "@/components/product/ProductList";
import ErrorFallback from "@/components/common/ErrorFallback";

export default async function HomePage() {
  try {
    const products = await getAllProducts();

    return (
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center my-10">Explore Our Products</h1>
        <ProductList initialProducts={products} />
      </main>
    );
  } catch (error) {
    console.error('Failed to fetch products:', error);
    
    return (
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center my-10">Explore Our Products</h1>
        <ErrorFallback message="Failed to load products. Please try refreshing the page." />
      </main>
    );
  }
}