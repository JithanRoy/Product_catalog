
import { getAllProducts } from "@/lib/api/products";
import ProductList from "@/components/product/ProductList";

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center my-10">Explore Our Products</h1>
      <ProductList initialProducts={products} />
    </main>
  );
}