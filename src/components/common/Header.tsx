// src/components/common/Header.tsx
'use client';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function Header() {
  const { isAuthenticated, logout } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="bg-navy text-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold text-teal-accent">
          Productify
        </Link>
        <div>
          {isMounted && ( // Wait for mount to avoid hydration mismatch
            isAuthenticated ? (
              <Button onClick={logout} variant="destructive">Logout</Button>
            ) : (
              <Link href="/login">
                <Button variant="secondary">Login</Button>
              </Link>
            )
          )}
        </div>
      </nav>
    </header>
  );
}