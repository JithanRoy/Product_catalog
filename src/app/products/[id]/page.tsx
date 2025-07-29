'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import ProductDetails from '@/components/product/ProductDetails';
import ProductDetailsSkeleton from '@/components/common/ProductCardSkeleton';

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
    if (isMounted && !isAuthenticated) {
      router.push('/login');
    }
  }, [isMounted, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      getProductById(params.id)
        .then(setProduct)
        .catch(console.error);
    }
  }, [isAuthenticated, params.id]);
  if (!isMounted || !product) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <main className="container mx-auto p-8">
      <ProductDetails product={product} />
    </main>
  );
}