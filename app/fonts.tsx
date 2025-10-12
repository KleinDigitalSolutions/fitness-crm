import { Inter, Poppins } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
  weight: ['400', '600', '700', '800'],
})