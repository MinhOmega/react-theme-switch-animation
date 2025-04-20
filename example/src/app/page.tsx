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

  // Reusable component for corner toggles
  const CornerToggle = ({
    position,
    title,
    animationType,
    styleId,
  }: {
    position: string
    title: string
    animationType: ThemeAnimationType
    styleId: string
  }) => (
    <div className={`absolute ${position} flex flex-col items-${position.includes('right') ? 'end' : 'start'}`}>
      <h3 className="text-xs font-semibold mb-1">{title}</h3>
      <SwitchDarkMode
        animationType={animationType}
        styleId={styleId}
        className="!w-10 !h-10 !text-xl"
        isDarkMode={isDarkMode}
        onDarkModeChange={handleDarkModeChange}
      />
    </div>
  )

  // Configuration for all corner toggles
  const cornerToggles = [
    {
      position: 'top-4 left-4',
      title: 'Blur: Top Center',
      animationType: ThemeAnimationType.BLUR_CIRCLE,
      styleId: 'top-center-blur',
    },
    {
      position: 'top-24 left-4',
      title: 'Top Left',
      animationType: ThemeAnimationType.CIRCLE,
      styleId: 'top-left-circle',
    },
    {
      position: 'top-4 right-4',
      title: 'Blur: Top Right',
      animationType: ThemeAnimationType.BLUR_CIRCLE,
      styleId: 'top-right-blur',
    },
    {
      position: 'top-24 right-4',
      title: 'Top Right',
      animationType: ThemeAnimationType.CIRCLE,
      styleId: 'top-right-circle',
    },
    {
      position: 'bottom-24 left-4',
      title: 'Bottom Left',
      animationType: ThemeAnimationType.CIRCLE,
      styleId: 'bottom-left-circle',
    },
    {
      position: 'bottom-24 right-4',
      title: 'Bottom Right',
      animationType: ThemeAnimationType.CIRCLE,
      styleId: 'bottom-right-circle',
    },
    {
      position: 'bottom-4 left-4',
      title: 'Blur: Bottom Left',
      animationType: ThemeAnimationType.BLUR_CIRCLE,
      styleId: 'bottom-left-blur',
    },
    {
      position: 'bottom-4 right-4',
      title: 'Blur: Bottom Right',
      animationType: ThemeAnimationType.BLUR_CIRCLE,
      styleId: 'bottom-right-blur',
    },
  ]

  return (
    <main className="flex min-h-screen items-center justify-center p-4 relative">
      {/* Center examples */}
      <div className="flex flex-col items-center gap-8">
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
      </div>

      {/* Corner toggles - Rendered dynamically */}
      {cornerToggles.map((toggle, index) => (
        <CornerToggle
          key={toggle.styleId}
          position={toggle.position}
          title={toggle.title}
          animationType={toggle.animationType}
          styleId={toggle.styleId}
        />
      ))}
    </main>
  )
}
