'use client'

import SwitchDarkMode from '@/components/switch-dark-mode'
import { useState } from 'react'
import { ThemeAnimationType } from '../../../src'

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('theme') === 'dark' : false
  )

  const handleDarkModeChange = (isDark: boolean) => {
    setIsDarkMode(isDark)
  }

  const animations = [
    {
      type: ThemeAnimationType.CIRCLE,
      title: 'Circle',
      description: 'Smooth expanding circle transition',
      icon: '⭕',
      gradient: 'from-blue-500 to-purple-600',
      bgPattern: 'bg-gradient-to-br',
    },
    {
      type: ThemeAnimationType.BLUR_CIRCLE,
      title: 'Blur Circle',
      description: 'Circle with elegant blur effect',
      icon: '🌀',
      gradient: 'from-emerald-500 to-teal-600',
      bgPattern: 'bg-gradient-to-br',
    },
    {
      type: ThemeAnimationType.QR_SCAN,
      title: 'QR Scan',
      description: 'Scanning line sweeps left to right',
      icon: '📱',
      gradient: 'from-orange-500 to-red-600',
      bgPattern: 'bg-gradient-to-br',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-400/5 dark:to-purple-400/5"></div>
        <div className="relative container mx-auto px-6 py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-200 dark:border-slate-700">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Live Demo</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                React Theme
              </span>
              <br />
              Switch Animation
            </h1>

            <p className="text-xl lg:text-2xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Beautiful, smooth animations for theme switching in React applications.
              <br className="hidden sm:block" />
              Built with TypeScript and powered by the View Transition API.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a
                href="https://github.com/MinhOmega/react-theme-switch-animation"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-semibold hover:scale-105 transition-transform duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/react-theme-switch-animation"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-semibold border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 5.183H13.82v-2.073h-2.383v2.073H5.113zm0 13.654v-5.195h6.324v2.072h2.383v-2.072h5.128v5.195z" />
                </svg>
                npm install
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Animations Showcase */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Try Different Animations
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Click any toggle below to experience the theme switch animations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {animations.map((animation, index) => (
            <div
              key={animation.type}
              className="group relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`absolute inset-0 ${animation.bgPattern} ${animation.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>

              <div className="relative p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">{animation.icon}</div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{animation.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">{animation.description}</p>
                </div>

                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                    <SwitchDarkMode
                      animationType={animation.type}
                      styleId={`${animation.type}-showcase`}
                      isDarkMode={isDarkMode}
                      onDarkModeChange={handleDarkModeChange}
                      className="relative !w-16 !h-16 !text-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-shadow duration-200"
                    />
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Duration</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">750ms</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-2">
                    <span className="text-slate-500 dark:text-slate-400">Easing</span>
                    <span className="font-mono text-slate-700 dark:text-slate-300">ease-in-out</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose This Library?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '⚡',
                title: 'High Performance',
                description: 'Optimized for high-resolution displays with smooth 60fps animations',
              },
              {
                icon: '🎨',
                title: 'Multiple Animations',
                description: 'Circle, blur circle, and QR scan effects with more coming soon',
              },
              {
                icon: '📱',
                title: 'Responsive Design',
                description: 'Works perfectly across all device sizes and screen resolutions',
              },
              {
                icon: '♿',
                title: 'Accessibility First',
                description: 'Respects prefers-reduced-motion and provides fallback experiences',
              },
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">Simple to Use</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">Get started with just a few lines of code</p>
          </div>

          <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl p-6 lg:p-8 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="ml-4 text-slate-400 text-sm">example.tsx</span>
            </div>
            <pre className="text-slate-300 overflow-x-auto">
              <code>{`import { useModeAnimation, ThemeAnimationType } from 'react-theme-switch-animation'

function ThemeToggle() {
  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation({
    animationType: ThemeAnimationType.CIRCLE
  })

  return (
    <button ref={ref} onClick={toggleSwitchTheme}>
      {isDarkMode ? '🌙' : '☀️'}
    </button>
  )
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-600 dark:text-slate-300">
              Made with ❤️ by{' '}
              <a
                href="https://github.com/MinhOmega"
                className="font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Minh Vo Ngoc Quang
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/MinhOmega/react-theme-switch-animation"
                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://www.npmjs.com/package/react-theme-switch-animation"
                className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
              >
                npm
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
