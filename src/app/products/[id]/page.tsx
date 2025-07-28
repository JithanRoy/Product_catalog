// src/app/products/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Import the new component and its skeleton
import ProductDetails from '@/components/product/ProductDetails';
import ProductDetailsSkeleton from '@/components/common/ProductCardSkeleton'; // We'll create this next

// State, API, and Type
import { useAuthStore } from '@/store/authStore';
import { getProductById } from "@/lib/api/products";
import { Product } from "@/types";

type Props = {
  params: { id: string };
};

export default function ProductDetailsPage({ params }: Props) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // This effect handles client-side protection
    if (isMounted && !isAuthenticated) {
      router.push('/login');
    }
  }, [isMounted, isAuthenticated, router]);

  useEffect(() => {
    // This effect fetches data if the user is authenticated
    if (isAuthenticated) {
      getProductById(params.id)
        .then(setProduct)
        .catch(console.error);
    }
  }, [isAuthenticated, params.id]);

  // Show skeleton loader until page is mounted and product is loaded
  if (!isMounted || !product) {
    return <ProductDetailsSkeleton />;
  }

  // Once loaded, render the dedicated component with the product data
  return (
    <main className="container mx-auto p-8">
      <ProductDetails product={product} />
    </main>
  );
}