import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="flex flex-col overflow-hidden bg-white hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="relative w-full h-48">
          <Image
            src={product.image}
            alt={product.title}
            fill
            style={{ objectFit: 'contain' }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardTitle className="text-lg font-semibold h-16 overflow-hidden text-navy">{product.title}</CardTitle>
        <p className="text-xl font-bold text-slate-gray mt-2">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/products/${product.id}`} className="w-full">
          <Button className="w-full bg-teal-accent hover:bg-teal-accent/90">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}