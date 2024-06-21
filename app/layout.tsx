import type { Metadata } from "next";
import { Poiret_One, Poppins } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const poiretOne = Poiret_One({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poiretOne",
});

export const metadata: Metadata = {
  title: "Canaã",
  description: "Grupo de Jovens - Canaã",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${poppins.variable} ${poiretOne.variable}`}>

        <ToastContainer autoClose={3000} />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
