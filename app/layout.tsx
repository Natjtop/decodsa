import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Global3D from '@/components/Global3D';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'DECODS | Enterprise Software Engineering',
  description: 'Pioneering the future of software development with cutting-edge technologies, high-frequency trading platforms, AI diagnostics, and blockchain systems.',
  keywords: ['Software Engineering', 'Web Development', 'App Development', 'Enterprise Backend', 'React', 'Next.js', 'Rust', 'Go'],
  openGraph: {
    title: 'DECODS | Enterprise Software Engineering',
    description: 'Pioneering the future of software development with cutting-edge technologies.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DECODS | Enterprise Software Engineering',
    description: 'Pioneering the future of software development with cutting-edge technologies.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-black text-white" suppressHydrationWarning>
        <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        <Global3D />
        {children}
      </body>
    </html>
  );
}
