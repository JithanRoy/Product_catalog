'use client';

import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { Product } from '@/types';

import { useFavoritesStore } from '@/store/favouritesStore';
import { useCartStore } from '@/store/cartStore';

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { Heart, ShoppingCart, Star } from 'lucide-react';

export default function ProductCard({ product }: { product: Product }) {

  const { favorites, addToFavorites, removeFromFavorites } = useFavoritesStore();
  const { addToCart } = useCartStore();

  const isFavorite = favorites.some((fav) => fav.id === product.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isFavorite ? removeFromFavorites(product.id) : addToFavorites(product);
    toast.info(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.title} has been added to your cart.`);
  };

  return (
    <Card className="group flex flex-col overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-4 border-b">
        <div className="relative aspect-square overflow-hidden rounded-md bg-white">
          <Image
            src={product.image}
            alt={product.title}
            fill
            priority
            className="object-contain group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-1 right-1 h-8 w-8 p-0 rounded-full bg-white/80 backdrop-blur-sm"
            onClick={handleToggleFavorite}
          >
            <Heart
              className={`h-4 w-4 transition-all ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-gray'
              }`}
            />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-semibold text-sm text-navy mb-2 line-clamp-2 min-h-[2.5rem]">
          {product.title}
        </h3>
        <p className="text-sm text-slate-gray capitalize mb-2">
          {product.category}
        </p>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-slate-gray ml-1">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-teal-accent">
            ${product.price.toFixed(2)}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAddToCart}
            className="h-8 w-8 p-0"
          >
            <ShoppingCart className="h-4 w-4 text-slate-gray" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full" variant="outline">
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}