// src/components/common/ProductList.tsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import ProductCardSkeleton from '@/components/common/ProductCardSkeleton';

interface ProductListProps {
  initialProducts: Product[];
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, initialProducts]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search products by title..."
        className="w-full p-3 border rounded-lg mb-8 focus:ring-2 focus:ring-blue-500 outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {!isClient ? (
          Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}