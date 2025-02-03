import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import './style.css'

const isBrowser = typeof window !== 'undefined'

export enum ThemeAnimationType {
  CIRCLE = 'circle',
  BLUR_CIRCLE = 'blur-circle',
}

interface ReactThemeSwitchAnimationHook {
  ref: React.RefObject<HTMLButtonElement>
  toggleSwitchTheme: () => Promise<void>
  isDarkMode: boolean
}

export interface ReactThemeSwitchAnimationProps {
  duration?: number
  easing?: string
  pseudoElement?: string
  globalClassName?: string
  animationType?: ThemeAnimationType
  blurAmount?: number
  styleId?: string
  isDarkMode?: boolean
  onDarkModeChange?: (isDark: boolean) => void
}

export const useModeAnimation = (props?: ReactThemeSwitchAnimationProps): ReactThemeSwitchAnimationHook => {
  const {
    duration = 750,
    easing = 'ease-in-out',
    pseudoElement = '::view-transition-new(root)',
    globalClassName = 'dark',
    animationType = ThemeAnimationType.CIRCLE,
    blurAmount = 2,
    styleId = 'theme-switch-style',
    isDarkMode: externalDarkMode,
    onDarkModeChange,
  } = props || {}

  const [internalDarkMode, setInternalDarkMode] = useState(isBrowser ? localStorage.getItem('theme') === 'dark' : false)

  const isDarkMode = externalDarkMode ?? internalDarkMode
  const setIsDarkMode = (value: boolean | ((prev: boolean) => boolean)) => {
    const newValue = typeof value === 'function' ? value(isDarkMode) : value
    if (onDarkModeChange) {
      onDarkModeChange(newValue)
    } else {
      setInternalDarkMode(newValue)
    }
  }

  const ref = useRef<HTMLButtonElement>(null)

  const createBlurCircleMask = (blur: number) => {
    // Using a larger viewBox and centered circle for better scaling
    return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100"><defs><filter id="blur"><feGaussianBlur stdDeviation="${blur}"/></filter></defs><circle cx="0" cy="0" r="25" fill="white" filter="url(%23blur)"/></svg>')`
  }

  const toggleSwitchTheme = async () => {
    if (
      !ref.current ||
      !(document as any).startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsDarkMode((isDarkMode) => !isDarkMode)
      return
    }

    const existingStyle = document.getElementById(styleId)
    if (existingStyle) {
      existingStyle.remove()
    }

    const { top, left, width, height } = ref.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const right = window.innerWidth - left
    const bottom = window.innerHeight - top
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom))
    const viewportSize = Math.max(window.innerWidth, window.innerHeight)
    const scaleFactor = 4

    if (animationType === ThemeAnimationType.BLUR_CIRCLE) {
      const styleElement = document.createElement('style')
      styleElement.id = styleId
      styleElement.textContent = `
        ::view-transition-group(root) {
          animation-duration: ${duration}ms;
          animation-timing-function: linear(
            0 0%, 0.2342 12.49%, 0.4374 24.99%,
            0.6093 37.49%, 0.6835 43.74%,
            0.7499 49.99%, 0.8086 56.25%,
            0.8593 62.5%, 0.9023 68.75%, 0.9375 75%,
            0.9648 81.25%, 0.9844 87.5%,
            0.9961 93.75%, 1 100%
          );
        }
        
        ::view-transition-new(root) {
          mask: ${createBlurCircleMask(blurAmount)} 0 0 / 100% 100% no-repeat;
          mask-position: ${x}px ${y}px;
          animation: maskScale ${duration}ms ${easing};
          transform-origin: ${x}px ${y}px;
        }
        
        ::view-transition-old(root),
        .dark::view-transition-old(root) {
          animation: maskScale ${duration}ms ${easing};
          transform-origin: ${x}px ${y}px;
          z-index: -1;
        }
        
        @keyframes maskScale {
          0% {
            mask-size: 0px;
            mask-position: ${x}px ${y}px;
          }
          100% {
            mask-size: ${viewportSize * scaleFactor}px;
            mask-position: ${x - (viewportSize * scaleFactor) / 2}px ${y - (viewportSize * scaleFactor) / 2}px;
          }
        }
      `
      document.head.appendChild(styleElement)
    }

    await (document as any).startViewTransition(() => {
      flushSync(() => {
        setIsDarkMode((isDarkMode) => !isDarkMode)
      })
    }).ready

    if (animationType === ThemeAnimationType.CIRCLE) {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRadius}px at ${x}px ${y}px)`],
        },
        {
          duration,
          easing,
          pseudoElement,
        }
      )
    }

    if (animationType === ThemeAnimationType.BLUR_CIRCLE) {
      setTimeout(() => {
        const styleElement = document.getElementById(styleId)
        if (styleElement) {
          styleElement.remove()
        }
      }, duration)
    }
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add(globalClassName)
      localStorage.theme = 'dark'
    } else {
      document.documentElement.classList.remove(globalClassName)
      localStorage.theme = 'light'
    }
  }, [isDarkMode, globalClassName])

  return {
    ref,
    toggleSwitchTheme,
    isDarkMode,
  }
}
