import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MonteviStay - Alquileres Vacacionales",
  description: "Encuentra el mejor alojamiento en Montevideo",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="es" className="h-full antialiased">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col font-sans`}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;