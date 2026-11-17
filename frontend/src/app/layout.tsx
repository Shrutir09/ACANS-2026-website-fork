import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: 'ACANS 2026 – National Seminar on "Advanced Computing and Nuclear Science: Emerging Technologies, Interdisciplinary Applications and Research Opportunities"',
  description: "Official website for ACANS 2026 – National Seminar on Advanced Computing and Nuclear Science: Emerging Technologies, Interdisciplinary Applications and Research Opportunities. Hosted by Dr. A.P.J. Abdul Kalam Women's Institute of Technology (WIT), Lalit Narayan Mithila University (LNMU), in collaboration with the Indian Nuclear Society (INS).",
  keywords: [
    'ACANS 2026',
    'Indian Nuclear Society',
    'Advanced Computing and Nuclear Science',
    'WIT Darbhanga',
    'LNMU',
    'Dr. A.P.J. Abdul Kalam Women\'s Institute of Technology',
    'Nuclear Science Conference',
    'AI Digital Twins',
  ],
  authors: [{ name: 'WIT LNMU & INS' }],
  openGraph: {
    title: 'ACANS 2026 – National Seminar on "Advanced Computing and Nuclear Science: Emerging Technologies, Interdisciplinary Applications and Research Opportunities"',
    description: "ACANS 2026 National Seminar hosted by Dr. A.P.J. Abdul Kalam Women's Institute of Technology (WIT), Lalit Narayan Mithila University (LNMU), in collaboration with the Indian Nuclear Society (INS).",
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <AuthProvider>
          <Navbar />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
