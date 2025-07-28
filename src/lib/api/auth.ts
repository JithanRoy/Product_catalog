import { LoginRequest } from "@/lib/validators/auth";

export async function loginUser(credentials: LoginRequest): Promise<{ token: string }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: credentials.username,
      password: credentials.password,
    }),
  });

  if (!res.ok) {
    throw new Error('Invalid username or password.');
  }

  return res.json();
}