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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-24">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold">Circle Animation</h1>
        <SwitchDarkMode
          animationType={ThemeAnimationType.CIRCLE}
          styleId="circle-animation"
          isDarkMode={isDarkMode}
          onDarkModeChange={handleDarkModeChange}
        />
      </div>

      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold">Blur Circle Animation</h1>
        <SwitchDarkMode
          animationType={ThemeAnimationType.BLUR_CIRCLE}
          styleId="blur-circle-animation"
          isDarkMode={isDarkMode}
          onDarkModeChange={handleDarkModeChange}
        />
      </div>
    </main>
  )
}
