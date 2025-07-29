
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'sonner';
import { Product } from '@/types';

import { useFavoritesStore } from '@/store/favouritesStore';
import { useCartStore } from '@/store/cartStore';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Star, ShoppingCart, Heart } from 'lucide-react';

export default function ProductDetails({ product }: { product: Product }) {
  const { favorites, addToFavorites, removeFromFavorites } = useFavoritesStore();
  const { addToCart } = useCartStore();

  const isFavorite = favorites.some(fav => fav.id === product.id);

  const handleToggleFavorite = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isFavorite ? removeFromFavorites(product.id) : addToFavorites(product);
    toast.info(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} has been added to your cart.`);
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" asChild>
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <div className="aspect-square overflow-hidden rounded-lg bg-white relative">
              <Image
                src={product.image}
                alt={product.title}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-navy mb-2">
              {product.title}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating.rate}</span>
                <span className="text-gray-500">
                  ({product.rating.count} reviews)
                </span>
              </div>
              <span className="text-sm text-slate-gray capitalize bg-light-gray px-2 py-1 rounded-md">
                {product.category}
              </span>
            </div>
            <div className="text-3xl font-bold text-teal-accent mb-4">
              ${product.price.toFixed(2)}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-navy mb-2">Description</h3>
            <p className="text-slate-gray leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleAddToCart} className="flex-1 bg-teal-accent hover:bg-teal-accent/90">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              onClick={handleToggleFavorite}
              className="px-3"
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-slate-gray'
                }`}
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}