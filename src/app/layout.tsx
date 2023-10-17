import Providers from "@/lib/Providers";
import "./globals.css";
import type { Metadata } from "next";
import Footer from "@/components/ui/Footer/Footer";

export const metadata: Metadata = {
  title: "Pro Internet",
  description: "This is a pro internet website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
