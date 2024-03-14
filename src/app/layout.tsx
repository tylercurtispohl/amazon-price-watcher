import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Nav } from "./components/nav";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tyler's Price Watcher",
  description: "Tyler's Amazon Price Watcher",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <Nav />
            <main className="flex flex-row justify-center text-gray-900 py-6">
              <div className="max-w-[1280px] w-full px-6">{children}</div>
            </main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
