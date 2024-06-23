import { useEffect, useRef } from 'react'
import { flushSync } from 'react-dom'
import { createGlobalState } from 'react-hooks-global-state'
import './style.css'

const isBrowser = typeof window !== 'undefined'

const initialState = { isDarkMode: isBrowser ? localStorage.getItem('theme') === 'dark' : false }
const { useGlobalState } = createGlobalState(initialState)

interface ModeAnimationHook {
  ref: React.RefObject<HTMLButtonElement>
  toggleDarkMode: () => Promise<void>
  isDarkMode: boolean
}

interface ModeAnimationOptions {
  duration?: number
  easing?: string
  pseudoElement?: string
}

export const useModeAnimation = (props?: ModeAnimationOptions): ModeAnimationHook => {
  const { duration = 750, easing = 'ease-in-out', pseudoElement = '::view-transition-new(root)' } = props
  const [isDarkMode, setIsDarkMode] = useGlobalState('isDarkMode')
  const ref = useRef<HTMLButtonElement>(null)

  const toggleDarkMode = async () => {
    if (
      !ref.current ||
      !(document as any).startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsDarkMode((isDarkMode) => !isDarkMode)
      return
    }

    await (document as any).startViewTransition(() => {
      flushSync(() => {
        setIsDarkMode((isDarkMode) => !isDarkMode)
      })
    }).ready

    const { top, left, width, height } = ref.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const right = window.innerWidth - left
    const bottom = window.innerHeight - top
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom))

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

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    }
  }, [isDarkMode])

  return {
    ref,
    toggleDarkMode,
    isDarkMode,
  }
}
