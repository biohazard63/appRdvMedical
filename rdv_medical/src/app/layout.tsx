import './globals.css';

import { Inter } from 'next/font/google';
import ClientLayout from '@/components/ClientLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'nexus',
  description: 'Welcome to the ultimate gaming experience!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
      <body className={`${inter.className} bg-gradient-to-r from-black via-gray-900 to-blue-900 text-white`}>
      <ClientLayout>
        <main className=" mx-auto p-4 bg-gray-800 rounded-lg shadow-lg ">
          {children}
        </main>
      </ClientLayout>
      </body>
      </html>
  );
}