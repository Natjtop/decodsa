'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'WEB', href: '/web' },
    { name: 'APP', href: '/app' },
    { name: 'SOFTWARE', href: '/software' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[95%] max-w-5xl rounded-full border ${
        isScrolled ? 'bg-black/80 backdrop-blur-md border-white/20 shadow-2xl shadow-white/5' : 'bg-black/40 backdrop-blur-sm border-white/10'
      }`}
    >
      <div className="px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
            <span className="flex h-2 w-2 bg-white rounded-full animate-pulse group-hover:bg-gray-300 transition-colors"></span>
            <span className="text-white font-mono font-bold text-xl tracking-[0.2em]">DECODS</span>
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`${pathname === link.href ? 'text-white' : 'text-gray-400'} hover:text-white px-3 py-2 text-xs font-mono tracking-widest transition-colors relative group`}
                >
                  {link.name}
                  {pathname === link.href && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></span>
                  )}
                </Link>
              ))}
              <Link
                href="/#contact"
                className="bg-white text-black hover:bg-gray-200 px-6 py-2 text-xs font-mono tracking-widest transition-all rounded-full"
              >
                START
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 rounded-b-3xl absolute top-full left-0 right-0 mt-2 overflow-hidden">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`${pathname === link.href ? 'text-white bg-white/5' : 'text-gray-400'} hover:text-white hover:bg-white/5 block px-4 py-4 text-sm font-mono tracking-widest rounded-xl transition-colors`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="block w-full text-center bg-white text-black hover:bg-gray-200 px-4 py-4 text-sm font-mono tracking-widest transition-all rounded-xl mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              START
            </Link>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
