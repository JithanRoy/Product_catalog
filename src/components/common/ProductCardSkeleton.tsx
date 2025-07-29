import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader>
        <Skeleton className="h-48 w-full" />
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-8 w-1/2" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}