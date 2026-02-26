'use client';

import { motion } from 'motion/react';

const technologies = [
  'REACT', 'NEXT.JS', 'TYPESCRIPT', 'NODE.JS', 'PYTHON', 'GO', 'RUST', 'GRAPHQL',
  'POSTGRESQL', 'MONGODB', 'REDIS', 'DOCKER', 'KUBERNETES', 'AWS', 'GCP', 'AZURE',
  'TENSORFLOW', 'PYTORCH', 'THREE.JS', 'WEBGL', 'WEBASSEMBLY', 'SOLIDITY'
];

export default function TechStack() {
  return (
    <section id="tech" className="py-24 relative z-10 bg-black/20 overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono text-white tracking-widest uppercase mb-4"
          >
            Technology Stack
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold tracking-tighter text-white uppercase"
          >
            System Dependencies
          </motion.h3>
        </div>
      </div>

      {/* Marquee effect */}
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 py-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="text-4xl md:text-6xl font-bold text-transparent transition-all duration-300 cursor-default select-none uppercase tracking-tighter"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-8 py-4 ml-8">
          {technologies.map((tech, index) => (
            <span
              key={`clone-${index}`}
              className="text-4xl md:text-6xl font-bold text-transparent transition-all duration-300 cursor-default select-none uppercase tracking-tighter"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee2 {
          animation: marquee2 40s linear infinite;
        }
        .group:hover .animate-marquee,
        .group:hover .animate-marquee2 {
          animation-play-state: paused;
        }
        .text-transparent:hover {
          -webkit-text-stroke: 1px rgba(255,255,255,1) !important;
          color: white;
        }
      `}</style>
    </section>
  );
}
