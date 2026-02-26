'use client';

import { Github, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-transparent border-t border-white/10 pt-20 pb-10 relative z-10 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-2xl tracking-[0.2em]">DECODS</span>
            </div>
            <p className="text-gray-400 font-light max-w-sm leading-relaxed text-sm">
              Pioneering the future of software development with cutting-edge technologies and unparalleled engineering excellence.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-500 hover:text-white transition-colors p-2 border border-white/10 hover:border-white">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors p-2 border border-white/10 hover:border-white">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors p-2 border border-white/10 hover:border-white">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors p-2 border border-white/10 hover:border-white">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Entity</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs tracking-widest uppercase">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs tracking-widest uppercase">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs tracking-widest uppercase">Logs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs tracking-widest uppercase">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 tracking-widest uppercase text-xs">Protocols</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs tracking-widest uppercase">Privacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs tracking-widest uppercase">Terms</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs tracking-widest uppercase">Cookies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors text-xs tracking-widest uppercase">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs tracking-widest uppercase">
            &copy; {new Date().getFullYear()} DECODS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500 tracking-widest uppercase">
            <span>SYSTEM STATUS:</span>
            <span className="text-white">OPTIMAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
