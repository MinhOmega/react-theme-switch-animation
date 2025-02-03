import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://minhomega.github.io/react-theme-switch-animation/'),
  title: 'React Theme Switch Animation',
  description:
    'An example implementation of a theme switcher with smooth animation using React and CSS variables, ideal for React and Next.js applications.',
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
    'TailwindCSS',
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
      'An example implementation of a theme switcher with smooth animation using React and CSS variables, ideal for React and Next.js applications.',
    url: 'https://github.com/MinhOmega/react-theme-switch-animation',
    siteName: 'React Theme Switch Animation',
    images: [
      {
        url: '/demo.gif',
        width: 800,
        height: 414,
        alt: 'React Theme Switch Animation',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'React Theme Switch Animation',
    description:
      'An example implementation of a theme switcher with smooth animation using React and CSS variables, ideal for React and Next.js applications.',
    images: ['/demo.gif'],
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
      <head>
        <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
      </head>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">{children}</body>
    </html>
  )
}
