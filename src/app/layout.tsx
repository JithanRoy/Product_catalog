import './globals.css';
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import Header from "@/components/common/Header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={cn("min-h-screen bg-light-gray font-sans antialiased", fontSans.variable)}>
    <Header />
    <main>{children}</main>
    </body>
    </html>
  );
}