import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import StoreProvider from "./components/storeProvider"; 

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Law Nation - Legal Research Portal",
  description: "Share and evaluate legal scholarship",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StoreProvider>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </StoreProvider>
        
        {/* ✅ ToastContainer Settings - Exactly wahi jo Adminlogin ke liye chahiye */}
        <ToastContainer 
          position="top-center" 
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
          limit={1} // ✅ Ek se zyada toast ek saath nahi dikhega
        />
      </body>
    </html>
  );
}