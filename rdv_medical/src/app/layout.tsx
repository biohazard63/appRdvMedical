import './globals.css';

import { Inter } from 'next/font/google';
import ClientLayout from '@/components/ClientLayout';
import {DateProvider} from "@/context/DateContext";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'nexus',
  description: 'Welcome to the ultimate gaming experience!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
      <body className={`${inter.className} `}>
      <ClientLayout>
          <DateProvider>
                {children}
          </DateProvider>
      </ClientLayout>
      </body>
      </html>
  );
}