'use client';

import { motion } from 'motion/react';

const services = [
  {
    id: '01',
    title: 'SYSTEM ARCHITECTURE',
    description: 'Designing scalable, resilient, and high-performance infrastructure for complex digital ecosystems.',
  },
  {
    id: '02',
    title: 'ADVANCED COMPUTING',
    description: 'Leveraging cutting-edge algorithms and distributed systems to solve computationally intensive problems.',
  },
  {
    id: '03',
    title: 'DATA ENGINEERING',
    description: 'Building robust pipelines and processing architectures for massive-scale data analytics.',
  },
  {
    id: '04',
    title: 'CYBERSECURITY',
    description: 'Implementing zero-trust architectures and advanced cryptographic protocols to secure digital assets.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative z-10 bg-black/40 border-y border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-0 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-mono text-white tracking-widest uppercase mb-4"
          >
            Capabilities
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold tracking-tighter text-white uppercase"
          >
            Core Protocols
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-white/10">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-8 md:p-12 border border-white/10 hover:bg-white hover:text-black transition-colors duration-300"
            >
              <div className="text-6xl font-bold font-mono text-white/20 group-hover:text-black/20 mb-8 transition-colors">
                {service.id}
              </div>
              
              <h4 className="text-2xl font-bold mb-4 tracking-tight uppercase">
                {service.title}
              </h4>
              
              <p className="text-gray-400 group-hover:text-gray-800 leading-relaxed font-mono text-sm transition-colors">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
