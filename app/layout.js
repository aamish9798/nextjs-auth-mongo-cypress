import { Geist, Geist_Mono } from "next/font/google";
import { SnackbarProvider } from "@/context/SnackbarContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Next-Auth-MUI",
  description: "This app is created for Learn MongoDB, JWT, and Cypress.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SnackbarProvider>{children}</SnackbarProvider>
      </body>
    </html>
  );
}
