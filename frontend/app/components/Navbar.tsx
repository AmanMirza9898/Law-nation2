"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { toast } from 'react-toastify' 

// ✅ Redux Imports
import { useSelector, useDispatch } from "react-redux"
// ✅ Path Fix: Relative path use kiya hai
import { setCredentials, logout as logoutAction } from "../lib/store/authSlice"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useDispatch()
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // ✅ SYNTAX ERROR FIX: '(state: any)' lagaya hai taaki Red Lines hat jayein
  const user = useSelector((state: any) => state.auth.user)

  // ✅ Refresh Fix
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("authToken");
      const userName = localStorage.getItem("userName");
      
      // Agar Redux khali hai par Storage me data hai, to Redux me bhar do
      if (token && !user) {
        dispatch(setCredentials({ 
          user: { name: userName || "User", email: "" }, 
          token: token 
        }));
      }
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    
    toast.info("Logged out successfully");
    setIsMobileMenuOpen(false); 
    router.push("/login");
  }

  const navItems = [
    { name: "Home", link: "/home" },
    { name: "About Us", link: "/about" },
    { name: "Research Paper", link: "/research-paper" },
    { name: "Submit Paper", link: "/submit-paper" }
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // Admin pages par Navbar mat dikhao
  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      <nav className="w-full bg-white shadow-sm border-b border-gray-200 navbar-font z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <img src="/img/logo.jpg" alt="Law Nation" className="h-12 w-auto" />
              </Link>
            </div>

            <div className="hidden lg:flex lg:items-center lg:space-x-1 flex-1 justify-center">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.link}
                  className={`px-4 py-2 text-gray-900 hover:text-red-600 transition-colors duration-200 ${
                    pathname === item.link ? "text-red-600 font-medium" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex lg:items-center lg:space-x-4">
              {/* ✅ Ab yahan User Name par Red Line nahi aayegi */}
              {user && user.name ? (
                <div className="flex items-center gap-3">
                    <span className="text-gray-700 font-medium">Hello, {user.name}</span>
                    <div className="relative group py-2">
                        <div className="h-10 w-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg cursor-pointer shadow-md border-2 border-white uppercase">
                            {user.name.charAt(0)}
                        </div>
                        <div className="absolute right-0 top-full pt-2 w-32 hidden group-hover:block z-50">
                            <div className="bg-white rounded-md shadow-xl py-1 border border-gray-100">
                                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
              ) : (
                <>
                  <Link href="/join-us" className="px-4 py-2 bg-white text-red-600 border border-red-600 rounded-md hover:bg-red-50 font-medium">Create Account</Link>
                  <Link href="/login" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium flex items-center gap-1">Login</Link>
                </>
              )}
            </div>

            <div className="lg:hidden">
              <button onClick={toggleMobileMenu} className="p-2 text-gray-700 hover:text-red-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile Menu Logic (Shortened for clarity, remains same) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={toggleMobileMenu} />
      )}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
         <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <img src="/img/logo.jpg" alt="Logo" className="h-10 w-auto" />
                <button onClick={toggleMobileMenu}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
                {navItems.map(item => (<Link key={item.name} href={item.link} className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600">{item.name}</Link>))}
            </div>
            <div className="border-t border-gray-200 p-4 space-y-3">
                 {user && user.name ? (
                     <button onClick={handleLogout} className="block w-full px-4 py-2.5 text-center bg-gray-100 text-red-600 border border-gray-200 rounded-md font-medium">Logout</button>
                 ) : (
                     <>
                        <Link href="/join-us" className="block w-full px-4 py-2.5 text-center bg-white text-red-600 border border-red-600 rounded-md font-medium">Create Account</Link>
                        <Link href="/login" className="block w-full px-4 py-2.5 text-center bg-red-600 text-white rounded-md font-medium">Sign In</Link>
                     </>
                 )}
            </div>
         </div>
      </div>
    </>
  )
}