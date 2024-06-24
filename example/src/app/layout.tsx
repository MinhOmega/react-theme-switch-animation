import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://minhomega.github.io/react-theme-switch-animation/'),
  title: 'React Theme Switch Animation',
  description:
    'An example implementation of a theme switcher using React Context and CSS variables, ideal for React and Next.js applications.',
  authors: [
    {
      name: 'Minh Vo Ngoc Quang',
      url: 'https://github.com/MinhOmega',
    },
  ],
  keywords: [
    'react',
    'theme switch',
    'css variables',
    'react context',
    'Next.js',
    'ReactJS',
    'TypeScript',
    'Next.js Custom Hooks',
    'ReactJS Custom Hooks',
    'Switch Theme Animation',
  ],
  creator: 'Minh Vo Ngoc Quang',
  robots: 'index, follow',
  applicationName: 'React Theme Switch Animation',
  publisher: 'Minh Vo Ngoc Quang',
  alternates: {
    canonical: 'https://github.com/MinhOmega/react-theme-switch-animation',
  },
  openGraph: {
    title: 'React Theme Switch Animation',
    description:
      'An easy-to-integrate theme switcher for React and Next.js apps, showcasing dynamic theme changes with minimal code.',
    url: 'https://github.com/MinhOmega/react-theme-switch-animation',
    siteName: 'React Theme Switch Animation',
    images: [
      {
        url: '/react-theme-switch-animation/demo.gif',
        width: 1200,
        height: 630,
        alt: 'React Theme Switch Animation',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'React Theme Switch Animation',
    description: 'Learn how to implement a dynamic theme switcher using React Context and CSS variables.',
    images: ['/react-theme-switch-animation/demo.gif'],
    creator: '@MinhVoNgocQuang',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">{children}</body>
    </html>
  )
}
