import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DECODS | Software Engineering',
  description: 'Enterprise-grade backend architectures. Designing scalable, resilient, and high-performance software infrastructures.',
};

export default function SoftwarePage() {
  return (
    <main className="min-h-screen bg-transparent text-white selection:bg-white/30 relative">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 mb-8">
              <span className="flex h-2 w-2 bg-white animate-pulse"></span>
              <span className="text-xs font-mono tracking-widest uppercase">Software Eng</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-8">
              Enterprise Backend
            </h1>
            <p className="text-base md:text-lg text-gray-400 font-mono leading-relaxed mb-12">
              Designing scalable, resilient, and high-performance software infrastructures. We specialize in complex enterprise environments and distributed systems.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative min-h-screen flex items-center py-32 overflow-hidden z-10 bg-black/40 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="mb-20">
            <h2 className="text-xs font-mono text-white tracking-widest uppercase mb-4">Backend Capabilities</h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-white uppercase">System Architecture</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Microservices', desc: 'Decoupled architectures for independent scaling and deployment. We build fault-tolerant systems using gRPC and event-driven patterns.' },
              { title: 'Data Pipelines', desc: 'Real-time processing engines for massive datasets. Kafka and Spark clusters capable of handling millions of events per second.' },
              { title: 'Cloud Native', desc: 'Kubernetes and Docker orchestration across multi-cloud environments. Automated CI/CD pipelines and infrastructure as code.' }
            ].map((feature, i) => (
              <div key={i} className="p-8 border border-white/10 bg-black/60 hover:bg-white/5 transition-colors">
                <div className="text-xs font-mono text-gray-500 mb-4">0{i + 1} //</div>
                <h3 className="text-xl font-bold uppercase mb-4">{feature.title}</h3>
                <p className="text-gray-400 font-mono text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="relative min-h-screen flex items-center py-32 overflow-hidden z-10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-xs font-mono text-white tracking-widest uppercase mb-4">Resilience</h2>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-white uppercase mb-8">High Availability</h3>
              <p className="text-gray-400 font-mono text-sm leading-relaxed mb-8">
                Our systems are designed to fail gracefully. We implement chaos engineering, automated failovers, and multi-region active-active deployments to ensure 99.999% uptime.
              </p>
              <ul className="space-y-4 font-mono text-sm text-gray-300">
                <li className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <span className="text-white font-bold">SLA</span>
                  <span className="text-gray-500">Service Level Agreement</span>
                  <span className="ml-auto text-white">99.999%</span>
                </li>
                <li className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <span className="text-white font-bold">RTO</span>
                  <span className="text-gray-500">Recovery Time Objective</span>
                  <span className="ml-auto text-white">&lt; 5s</span>
                </li>
                <li className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <span className="text-white font-bold">RPO</span>
                  <span className="text-gray-500">Recovery Point Objective</span>
                  <span className="ml-auto text-white">0s</span>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
              {['Go', 'Rust', 'Python', 'Node.js', 'Kubernetes', 'Kafka', 'PostgreSQL', 'Redis'].map((tech) => (
                <div key={tech} className="p-4 border border-white/10 text-center font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden z-10 border-t border-white/10 bg-black/60">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-8">Ready to Initialize?</h2>
          <a href="/#contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-mono tracking-widest text-black bg-white transition-all hover:bg-gray-200 uppercase">
            Deploy Protocol
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
