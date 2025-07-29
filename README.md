# Product Catalog

This is a [Next.js](https://nextjs.org) e-commerce demo application bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It showcases a product catalog with authentication, favorites, and cart management.

## Features

- **Product List**: Browse all products on the homepage ([`src/app/page.tsx`](src/app/page.tsx)), with search functionality ([`src/components/product/ProductList.tsx`](src/components/product/ProductList.tsx)).
- **Product Details**: View detailed information for each product ([`src/app/products/[id]/page.tsx`](src/app/products/[id]/page.tsx)), including image, description, price, rating, and category.
- **Cart Management**: Add products to your cart, adjust quantities, and remove items. View cart contents in a sheet ([`src/components/cart/CartSheet.tsx`](src/components/cart/CartSheet.tsx)).
- **Favorites**: Mark products as favorites and manage your favorites list ([`src/store/favouritesStore.ts`](src/store/favouritesStore.ts)).
- **Authentication**: Login page ([`src/app/login/page.tsx`](src/app/login/page.tsx)) with demo credentials. Auth state is persisted ([`src/store/authStore.ts`](src/store/authStore.ts)).
- **Responsive UI**: Built with Tailwind CSS and shadcn/ui components for a modern, responsive design.
- **State Management**: Uses [Zustand](https://zustand-demo.pmnd.rs/) for global state (cart, favorites, auth).

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. **Set up environment variables**:

   Copy `.env*.example` to `.env.local` and set `NEXT_PUBLIC_API_URL` (e.g. `https://fakestoreapi.com`).

3. **Run the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open the app**:

   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Credentials

- **Username**: `mor_2314`
- **Password**: `83r5^_`

## Project Structure

- [`src/app/`](src/app/) – Next.js app directory (pages, layout, global styles)
- [`src/components/`](src/components/) – UI and feature components
- [`src/store/`](src/store/) – Zustand stores for cart, favorites, and auth
- [`src/lib/`](src/lib/) – API calls and utility functions
- [`src/types/`](src/types/) – TypeScript types

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation)

## License

This project is for