// src/components/cart/CartSheet.tsx
'use client';

import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import Link from "next/link";

// Reusable Icon Badge from Header
const IconBadge = ({ count }: { count: number }) => {
  if (count === 0) return null;
  return (
    <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
      {count}
    </span>
  );
};

export default function CartSheet() {
  const { items, getTotalItems, getTotalPrice, removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore();
  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative">
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
            <IconBadge count={totalItems} />
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart ({totalItems})</SheetTitle>
        </SheetHeader>
        {totalItems > 0 ? (
          <>
            <ScrollArea className="flex-grow pr-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center justify-center">
                    <div className="relative h-16 w-16 items-start rounded-md overflow-hidden bg-white">
                      <Image src={item.image} alt={item.title} fill className="object-contain" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                      <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => decreaseQuantity(item.id)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => increaseQuantity(item.id)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => removeFromCart(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <SheetFooter>
              <div className="w-full space-y-4">
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <SheetClose asChild>
                  <Button className="w-full bg-teal-accent hover:bg-teal-accent/90">
                    Continue to further develop
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <ShoppingCart className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500">Your cart is empty.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}