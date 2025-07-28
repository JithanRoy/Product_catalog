// src/app/products/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { getProductById } from "@/lib/api/products";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"; // Correctly imported

type Props = {
  params: { id: string };
};

// This is a new, reusable component for your skeleton loader.
const ProductDetailsSkeleton = () => (
  <main className="container mx-auto p-8">
    <div className="flex flex-col md:flex-row gap-10">
      <div className="md:w-1/2">
        <Skeleton className="aspect-square w-full rounded-lg" />
      </div>
      <div className="md:w-1/2 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-6 w-1/4" />
        <div className="space-y-2 pt-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="h-10 w-32 mt-4" />
      </div>
    </div>
  </main>
);

export default function ProductDetailsPage({ params }: Props) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.push('/login');
    }
  }, [isMounted, isAuthenticated, router]);

  // We can combine the loading state. We are loading until a product is set.
  const isLoading = !product;

  useEffect(() => {
    if (isAuthenticated) {
      getProductById(params.id)
        .then(setProduct)
        .catch(console.error);
    }
  }, [isAuthenticated, params.id]);


  // Show the skeleton loader until the component is mounted and data is fetched.
  if (!isMounted || isLoading) {
    return <ProductDetailsSkeleton />;
  }

  // If there's no product after loading, show an error.
  // This check is now redundant since isLoading handles it, but it's good for safety.
  if (!product) {
    return <main className="container mx-auto p-8">Product not found.</main>;
  }

  // Render the final page content
  return (
    <main className="container mx-auto p-8">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="md:w-1/2 relative h-96">
          <Image src={product.image} alt={product.title} fill style={{ objectFit: 'contain' }} sizes="(max-width: 768px) 100vw, 50vw"/>
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
          <p className="text-sm text-gray-500 mb-4 capitalize">{product.category}</p>
          <p className="text-xl text-gray-800 font-semibold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Products
          </Link>
        </div>
      </div>
    </main>
  );
}