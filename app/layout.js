import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "./providers"; // ✅ import the new provider wrapper

export const metadata = {
  title: "NextAuth + Prisma Demo",
  description: "Modern Next.js authentication demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
