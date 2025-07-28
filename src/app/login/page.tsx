'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { LoginRequest, LoginSchema } from '@/lib/validators/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {loginUser} from "../../lib/api/auth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<LoginRequest>({
    resolver: zodResolver(LoginSchema),
  });

    const onSubmit = async (data: LoginRequest) => {
      try {
        const { token } = await loginUser(data);
        login(token);
        router.push('/');
      } catch (error) {
        setError("root", { message: error.message || "Login failed." });
      }
    };

  return (
    <div className="container flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-sm bg-white">
        <CardHeader>
          <CardTitle className="text-2xl text-navy">Login</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {errors.root && <p className="text-red-500 text-sm text-center">{errors.root.message}</p>}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" {...register('username')} placeholder="username" />
              {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register('password')} placeholder="password" />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-teal-accent hover:bg-teal-accent/90" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
            <div className="text-center text-sm text-muted-foreground">
              <p>Demo credentials:</p>
              <p>Username: mor_2314</p>
              <p>Password: 83r5^_</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}