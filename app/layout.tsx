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
  title: "NetVoiX",
  description: "Plataforma de gestión de clientes de NetVoiX",
  icons: {
    icon: [
      {
        url: "/cropped-netvoix_logo_voip-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/cropped-netvoix_logo_voip-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/cropped-netvoix_logo_voip-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    shortcut: "/cropped-netvoix_logo_voip-32x32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/cropped-netvoix_logo_voip-32x32.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/cropped-netvoix_logo_voip-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/cropped-netvoix_logo_voip-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          href="/cropped-netvoix_logo_voip-192x192.png"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
