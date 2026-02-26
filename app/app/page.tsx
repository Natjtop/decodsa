import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DECODS | App Systems',
  description: 'Native and cross-platform mobile solutions. Engineering robust, high-performance mobile applications for iOS and Android.',
};

export default function AppPage() {
  return (
    <main className="min-h-screen bg-transparent text-white selection:bg-white/30 relative">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 mb-8">
              <span className="flex h-2 w-2 bg-white animate-pulse"></span>
              <span className="text-xs font-mono tracking-widest uppercase">App Systems</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-8">
              Native Mobile Solutions
            </h1>
            <p className="text-base md:text-lg text-gray-400 font-mono leading-relaxed mb-12">
              Engineering robust, high-performance mobile applications for iOS and Android. We focus on seamless user experiences and deep hardware integration.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative min-h-screen flex items-center py-32 overflow-hidden z-10 bg-black/40 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="mb-20">
            <h2 className="text-xs font-mono text-white tracking-widest uppercase mb-4">Mobile Capabilities</h2>
            <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-white uppercase">Platform Features</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'iOS Native', desc: 'Swift and SwiftUI for unparalleled performance on Apple devices. We leverage CoreML, ARKit, and Metal for advanced features.' },
              { title: 'Android Native', desc: 'Kotlin-first development for the Android ecosystem. Deep integration with hardware sensors and background processing.' },
              { title: 'Cross-Platform', desc: 'React Native and Flutter for unified codebases without sacrificing native performance or user experience.' }
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
              <h2 className="text-xs font-mono text-white tracking-widest uppercase mb-4">Hardware</h2>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-white uppercase mb-8">Deep Integration</h3>
              <p className="text-gray-400 font-mono text-sm leading-relaxed mb-8">
                We go beyond basic UI. Our mobile applications interact directly with device hardware, utilizing Bluetooth Low Energy (BLE), NFC, biometric authentication, and advanced camera APIs.
              </p>
              <ul className="space-y-4 font-mono text-sm text-gray-300">
                <li className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <span className="text-white font-bold">BLE</span>
                  <span className="text-gray-500">Bluetooth Low Energy</span>
                  <span className="ml-auto text-white">IoT Sync</span>
                </li>
                <li className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <span className="text-white font-bold">NFC</span>
                  <span className="text-gray-500">Near Field Communication</span>
                  <span className="ml-auto text-white">Payments</span>
                </li>
                <li className="flex items-center gap-4 border-b border-white/10 pb-4">
                  <span className="text-white font-bold">AR</span>
                  <span className="text-gray-500">Augmented Reality</span>
                  <span className="ml-auto text-white">Spatial</span>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
              {['Swift', 'Kotlin', 'React Native', 'Flutter', 'CoreML', 'ARKit', 'Firebase', 'SQLite'].map((tech) => (
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
