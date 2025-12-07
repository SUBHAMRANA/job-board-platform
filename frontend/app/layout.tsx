import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '../components/Navbar';
import { AuthProvider } from '../context/AuthContext'; // <-- Import 1

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Job Board Platform',
  description: 'Find your dream job',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Wrap everything inside AuthProvider */}
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}