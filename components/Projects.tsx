'use client';

import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

const projects = [
  {
    title: 'QUANTUM.FIN',
    category: 'FINTECH',
    description: 'A high-frequency trading platform built with Rust and WebAssembly, processing millions of transactions per second with sub-millisecond latency.',
    image: 'https://picsum.photos/800/600?random=1&grayscale',
    tech: ['RUST', 'WASM', 'REACT', 'POSTGRESQL'],
  },
  {
    title: 'NEURAL.MED',
    category: 'HEALTHCARE',
    description: 'An AI-driven diagnostic tool that analyzes medical imaging using advanced deep learning models to assist radiologists in early detection.',
    image: 'https://picsum.photos/800/600?random=2&grayscale',
    tech: ['PYTHON', 'TENSORFLOW', 'NEXT.JS', 'AWS'],
  },
  {
    title: 'NEXUS.CHAIN',
    category: 'LOGISTICS',
    description: 'A blockchain-based supply chain tracking system ensuring transparency and immutability from manufacturer to end consumer.',
    image: 'https://picsum.photos/800/600?random=3&grayscale',
    tech: ['SOLIDITY', 'NODE.JS', 'REACT', 'MONGODB'],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 relative z-10 bg-black/20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent z-0 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 border-b border-white/10 pb-10">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs font-mono text-white tracking-widest uppercase mb-4"
            >
              Featured Work
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-5xl font-bold tracking-tighter text-white uppercase"
            >
              System Outputs
            </motion.h3>
          </div>
          <motion.a
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 text-xs font-mono text-white/60 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-1 uppercase tracking-widest"
          >
            View All Logs <ExternalLink className="w-4 h-4" />
          </motion.a>
        </div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-24 items-center group`}
            >
              {/* Image Container */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative aspect-[4/3] overflow-hidden border border-white/20 group-hover:border-white transition-colors duration-500">
                  <div className="absolute inset-0 bg-black/60 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 z-20 transition-opacity duration-500 pointer-events-none"></div>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  {/* Scanning line effect */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-white/50 blur-sm -translate-y-full group-hover:animate-[scan_2s_ease-in-out_infinite] z-30"></div>
                </div>
              </div>

              {/* Content Container */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div>
                  <span className="text-xs font-mono text-white tracking-widest uppercase mb-4 block border-b border-white/20 pb-2 inline-block">
                    {project.category}
                  </span>
                  <h4 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight uppercase">
                    {project.title}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed font-mono">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 text-xs font-mono text-white border border-white/20 hover:bg-white hover:text-black transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-white hover:text-gray-400 transition-colors uppercase mt-4"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-white hover:text-gray-400 transition-colors uppercase mt-4"
                  >
                    <Github className="w-4 h-4" /> Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
