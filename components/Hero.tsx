'use client';

import { motion } from 'motion/react';
import { ArrowRight, Terminal } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-transparent">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90 z-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 mb-8"
        >
          <span className="flex h-2 w-2 bg-white animate-pulse"></span>
          <span className="text-xs font-mono tracking-widest text-white uppercase">System Online</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 uppercase"
          style={{ textShadow: '0 0 40px rgba(255,255,255,0.3)' }}
        >
          Enterprise <br />
          Software <br />
          Engineering
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto text-base md:text-lg text-gray-400 mb-10 font-mono font-light tracking-wide uppercase"
        >
          DECODS: Building the architecture of tomorrow. <br className="hidden md:block" />
          High-performance systems for the modern web.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-mono tracking-widest text-black bg-white transition-all hover:bg-gray-200"
          >
            <span className="relative z-10 flex items-center gap-2 uppercase">
              Initialize <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-mono tracking-widest text-white border border-white/20 hover:bg-white/10 transition-all uppercase"
          >
            <Terminal className="w-4 h-4" /> View Logs
          </a>
        </motion.div>
      </div>
    </section>
  );
}
