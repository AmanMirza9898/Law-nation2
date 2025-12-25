
"use client"
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-8 font-sans border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Top Section: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* 1. Logo & Intro */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              LAW<span className="text-red-600">NATION</span>
            </h2>
            <p className="text-sm leading-relaxed text-neutral-400">
              Empowering the global legal community through transparent scholarship, 
              open access research, and collaborative peer reviews.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-red-700 transition duration-300">
                <span className="text-xs font-bold text-white">in</span>
              </Link>
              <Link href="#" className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-red-700 transition duration-300">
                <span className="text-xs font-bold text-white">X</span>
              </Link>
            </div>
          </div>

          {/* 2. Resources */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Resources</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/research-paper" className="hover:text-red-500 transition">Browse Journals</Link></li>
              <li><Link href="/submit-paper" className="hover:text-red-500 transition">Submission Guide</Link></li>
              <li><Link href="#" className="hover:text-red-500 transition">Peer Review Process</Link></li>
            </ul>
          </div>

          {/* 3. Institution */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Institution</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/about" className="hover:text-red-500 transition">About Us</Link></li>
              <li><Link href="#" className="hover:text-red-500 transition">Editorial Board</Link></li>
              <li><Link href="#" className="hover:text-red-500 transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* 4. Newsletter */}
          <div className="space-y-4">
            <h3 className="text-white font-bold mb-2 uppercase text-xs tracking-[0.2em]">Stay Updated</h3>
            <form className="flex flex-col gap-3 mt-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter email" 
                className="bg-neutral-800 border-none rounded-lg px-4 py-3 text-sm text-white focus:ring-1 focus:ring-red-600 outline-none"
                required
              />
              <button className="bg-red-700 hover:bg-red-800 text-white text-sm font-bold py-3 rounded-lg transition duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[12px] text-neutral-500 text-center">
            © {new Date().getFullYear()} Law Nation. Built for the global legal community.
          </p>
          <div className="flex gap-6 text-[10px] text-neutral-500 font-medium uppercase tracking-widest">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> System Online
            </span>
            <span>ISSN: 2025-4890</span>
          </div>
        </div>
      </div>
    </footer>
  );
}