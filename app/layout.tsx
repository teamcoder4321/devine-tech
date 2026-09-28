import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Noto_Sans_Devanagari } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500'],
  variable: '--font-devanagari',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Devine Tech — AI-First Digital Engineering Agency',
  description:
    'Devine Tech builds next-generation web, mobile, AI, and cloud infrastructure products for ambitious companies. Explore our services, work, team, and get an instant project estimate.',
  generator: 'v0.app',
  keywords: [
    'digital agency',
    'AI development',
    'web development',
    'cloud infrastructure',
    'software engineering',
  ],
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${notoDevanagari.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
