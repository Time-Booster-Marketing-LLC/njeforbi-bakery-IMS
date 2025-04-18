import type { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";

const montserratAlt = Montserrat_Alternates({
  variable: "--font-montserrat-alt",
  subsets: ["latin"],
  display: "swap",
  weight: "100"
});

export const metadata: Metadata = {
  title: "Tastes it better",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserratAlt.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
