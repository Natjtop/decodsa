'use client';

import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 relative z-10 bg-black/20 border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-0 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Contact Info */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs font-mono text-white tracking-widest uppercase mb-4"
            >
              Communication Protocol
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-8 uppercase"
            >
              Initialize <br />
              Contact
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-400 text-sm leading-relaxed font-mono mb-12 max-w-md"
            >
              System ready to receive input. Our engineering team is on standby to process your request and initiate development protocols.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8 font-mono"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 border border-white/20">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 uppercase tracking-widest text-xs">Email</h4>
                  <p className="text-gray-400 text-sm">hello@decods.dev</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 border border-white/20">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 uppercase tracking-widest text-xs">Location</h4>
                  <p className="text-gray-400 text-sm">Sector 7G<br />Silicon Valley, CA</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 border border-white/20">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1 uppercase tracking-widest text-xs">Comm Link</h4>
                  <p className="text-gray-400 text-sm">+1 (555) 010-1010</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="border border-white/20 p-8 lg:p-12 relative overflow-hidden bg-black/60"
          >
            <form className="relative z-10 space-y-6 font-mono" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold text-white tracking-widest uppercase">Identifier</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-transparent border border-white/20 px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-all text-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold text-white tracking-widest uppercase">Return Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-transparent border border-white/20 px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-all text-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-bold text-white tracking-widest uppercase">Query Type</label>
                <input
                  type="text"
                  id="subject"
                  className="w-full bg-transparent border border-white/20 px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-all text-sm"
                  placeholder="System Architecture"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold text-white tracking-widest uppercase">Payload</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full bg-transparent border border-white/20 px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-all resize-none text-sm"
                  placeholder="Enter data here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full group relative inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-bold tracking-widest uppercase text-black bg-white transition-all hover:bg-gray-200"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Transmit <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
