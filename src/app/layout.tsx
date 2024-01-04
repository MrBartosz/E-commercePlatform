import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import { Header } from '@/components/Header'
import { AuthProvider } from './Providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'E-commerce Platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
