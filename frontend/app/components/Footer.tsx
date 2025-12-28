"use client"
import React from "react"
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* 1. Brand & Intro */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-bold text-white tracking-tighter">
                LAW<span className="text-red-600">NATION</span>
              </h2>
            </Link>
            <p className="text-sm leading-7 text-neutral-500 max-w-sm">
              Bridging the gap between legal scholarship and global practice. 
              We provide open-access research, peer-reviewed journals, and a platform for legal innovation.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <SocialLink href="#" label="Li" />
              <SocialLink href="#" label="Tw" />
              <SocialLink href="#" label="Fb" />
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="lg:col-span-2 lg:ml-auto">
            <h3 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-6">Explore</h3>
            <ul className="space-y-3 text-sm">
              <FooterLink href="/home" text="Home" />
              <FooterLink href="/about" text="About Us" />
              <FooterLink href="/research-paper" text="Journals" />
              <FooterLink href="/submit-paper" text="Submit Paper" />
            </ul>
          </div>

          {/* 3. Resources */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-6">Legal</h3>
            <ul className="space-y-3 text-sm">
              <FooterLink href="#" text="Privacy Policy" />
              <FooterLink href="#" text="Terms of Service" />
              <FooterLink href="#" text="Cookie Policy" />
              <FooterLink href="#" text="Editorial Board" />
            </ul>
          </div>

          {/* 4. Newsletter */}
          <div className="lg:col-span-4">
            <h3 className="text-white text-xs font-bold uppercase tracking-[0.2em] mb-4">Stay Informed</h3>
            <p className="text-xs text-neutral-500 mb-4">
              Subscribe to our newsletter for the latest legal citations and updates.
            </p>
            <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="w-full bg-neutral-900 border border-neutral-800 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder:text-neutral-600"
                required
              />
              <button className="bg-white hover:bg-neutral-200 text-black text-sm font-bold px-6 py-2.5 rounded transition duration-200">
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center text-xs text-neutral-600">
            <p>© {currentYear} Law Nation. All rights reserved.</p>
            <span className="hidden md:inline text-neutral-800">|</span>
            <p>ISSN: 2025-4890</p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ✅ FIX: Added types for TypeScript (Red lines will go away)
function FooterLink({ href, text }: { href: string; text: string }) {
  return (
    <li>
      <Link href={href} className="hover:text-white transition-colors duration-200">
        {text}
      </Link>
    </li>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <Link 
      href={href} 
      className="w-8 h-8 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
    >
      {label}
    </Link>
  );
}