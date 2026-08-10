import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'

const isBrowser = typeof window !== 'undefined'

// Inject base CSS for view transitions
const injectBaseStyles = () => {
  if (isBrowser) {
    const styleId = 'theme-switch-base-style'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      const isHighResolution = window.innerWidth >= 3000 || window.innerHeight >= 2000

      style.textContent = `
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
          ${isHighResolution ? 'transform: translateZ(0);' : ''}
        }
        
        ${
          isHighResolution
            ? `
        ::view-transition-group(root),
        ::view-transition-image-pair(root),
        ::view-transition-old(root),
        ::view-transition-new(root) {
          backface-visibility: hidden;
          perspective: 1000px;
          transform: translate3d(0, 0, 0);
        }
        `
            : ''
        }
      `
      document.head.appendChild(style)
    }
  }
}

export enum ThemeAnimationType {
  CIRCLE = 'circle',
  BLUR_CIRCLE = 'blur-circle',
  QR_SCAN = 'qr-scan',
  POLYGON = 'polygon',
  POLYGON_GRADIENT = 'polygon-gradient',
  GIF = 'gif',
}

export enum ThemeAnimationDirection {
  LTR = 'ltr',
  RTL = 'rtl',
  TTB = 'ttb',
  BTT = 'btt',
}

// Exponential easing curves (CSS linear() approximations) used by the
// polygon and gif animations for a snappy reveal effect
const EXPO_OUT_EASING =
  'linear(' +
  '0 0%, 0.1684 2.66%, 0.3165 5.49%, 0.446 8.52%,' +
  '0.5581 11.78%, 0.6535 15.29%, 0.7341 19.11%,' +
  '0.8011 23.3%, 0.8557 27.93%, 0.8962 32.68%,' +
  '0.9283 38.01%, 0.9529 44.08%, 0.9711 51.14%,' +
  '0.9833 59.06%, 0.9915 68.74%, 1 100%' +
  ')'

const EXPO_IN_EASING =
  'linear(' +
  '0 0%, 0.0085 31.26%, 0.0167 40.94%, 0.0289 48.86%,' +
  '0.0471 55.92%, 0.0717 61.99%, 0.1038 67.32%,' +
  '0.1443 72.07%, 0.1989 76.7%, 0.2659 80.89%,' +
  '0.3465 84.71%, 0.4419 88.22%, 0.554 91.48%,' +
  '0.6835 94.51%, 0.8316 97.34%, 1 100%' +
  ')'

interface ReactThemeSwitchAnimationHook {
  ref: React.RefObject<HTMLButtonElement | null>
  toggleSwitchTheme: () => Promise<void>
  isDarkMode: boolean
}

export interface ReactThemeSwitchAnimationProps {
  duration?: number
  easing?: string
  pseudoElement?: string
  globalClassName?: string
  animationType?: ThemeAnimationType
  direction?: ThemeAnimationDirection | `${ThemeAnimationDirection}`
  blurAmount?: number
  gifUrl?: string
  styleId?: string
  isDarkMode?: boolean
  onDarkModeChange?: (isDark: boolean) => void
}

export const useModeAnimation = (props?: ReactThemeSwitchAnimationProps): ReactThemeSwitchAnimationHook => {
  const {
    duration: customDuration,
    easing: customEasing,
    pseudoElement = '::view-transition-new(root)',
    globalClassName = 'dark',
    animationType = ThemeAnimationType.CIRCLE,
    direction = ThemeAnimationDirection.LTR,
    blurAmount = 2,
    gifUrl,
    styleId = 'theme-switch-style',
    isDarkMode: externalDarkMode,
    onDarkModeChange,
  } = props || {}

  // Gif and polygon-gradient animations need more time to read the reveal effect
  const propsDuration =
    customDuration ??
    (animationType === ThemeAnimationType.GIF
      ? 2000
      : animationType === ThemeAnimationType.POLYGON_GRADIENT
        ? 1500
        : 750)

  const easing =
    customEasing ??
    (animationType === ThemeAnimationType.POLYGON || animationType === ThemeAnimationType.POLYGON_GRADIENT
      ? EXPO_OUT_EASING
      : animationType === ThemeAnimationType.GIF
        ? EXPO_IN_EASING
        : 'ease-in-out')

  const isHighResolution = typeof window !== 'undefined' && (window.innerWidth >= 3000 || window.innerHeight >= 2000)

  const duration = isHighResolution ? Math.max(propsDuration * 0.8, 500) : propsDuration

  // Inject base styles when the hook is initialized
  useEffect(() => {
    injectBaseStyles()
  }, [])

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
    const isHighResolution = typeof window !== 'undefined' && (window.innerWidth >= 3000 || window.innerHeight >= 2000)

    const blurFilter = isHighResolution
      ? `<filter id="blur"><feGaussianBlur stdDeviation="${blur}" /></filter>`
      : `<filter id="blur"><feGaussianBlur stdDeviation="${blur}" /></filter>`

    const circleRadius = isHighResolution ? 20 : 25

    return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100"><defs>${blurFilter}</defs><circle cx="0" cy="0" r="${circleRadius}" fill="white" filter="url(%23blur)"/></svg>')`
  }

  // Triangle with a soft gradient edge, anchored to the top-left corner
  const createPolygonGradientMask = () => {
    const gradient =
      '<linearGradient id="g" x1="0" y1="0" x2="20.5" y2="20.5" gradientUnits="userSpaceOnUse">' +
      '<stop stop-color="white"/>' +
      '<stop offset="0.84506" stop-color="white" stop-opacity="0.99"/>' +
      '<stop offset="0.9506" stop-color="white" stop-opacity="0"/>' +
      '<stop offset="1" stop-color="white" stop-opacity="0"/>' +
      '</linearGradient>'

    return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><defs>${gradient}</defs><path d="M0 0H40L0 40V0Z" fill="url(%23g)"/></svg>')`
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

    // Calculate the distance to each corner of the viewport
    const topLeft = Math.hypot(x, y)
    const topRight = Math.hypot(window.innerWidth - x, y)
    const bottomLeft = Math.hypot(x, window.innerHeight - y)
    const bottomRight = Math.hypot(window.innerWidth - x, window.innerHeight - y)

    // Find the maximum distance to ensure animation covers the entire viewport
    const maxRadius = Math.max(topLeft, topRight, bottomLeft, bottomRight)

    const viewportSize = Math.max(window.innerWidth, window.innerHeight) + 200

    const isHighResolution = window.innerWidth >= 3000 || window.innerHeight >= 2000
    const scaleFactor = isHighResolution ? 2.5 : 4

    const optimalMaskSize = isHighResolution ? Math.min(viewportSize * scaleFactor, 5000) : viewportSize * scaleFactor

    const finalMaskPosition = {
      x: x - optimalMaskSize / 2,
      y: y - optimalMaskSize / 2,
    }

    if (animationType === ThemeAnimationType.BLUR_CIRCLE) {
      const styleElement = document.createElement('style')
      styleElement.id = styleId

      // Improved sizing and animation for corner positions
      const blurFactor = isHighResolution ? 1.5 : 1.2
      const finalMaskSize = Math.max(optimalMaskSize, maxRadius * 2.5)

      styleElement.textContent = `
        ::view-transition-group(root) {
          animation-duration: ${duration}ms;
          animation-timing-function: ${
            isHighResolution
              ? 'cubic-bezier(0.2, 0, 0.2, 1)'
              : 'linear(' +
                '0 0%, 0.2342 12.49%, 0.4374 24.99%,' +
                '0.6093 37.49%, 0.6835 43.74%,' +
                '0.7499 49.99%, 0.8086 56.25%,' +
                '0.8593 62.5%, 0.9023 68.75%, 0.9375 75%,' +
                '0.9648 81.25%, 0.9844 87.5%,' +
                '0.9961 93.75%, 1 100%' +
                ')'
          };
          will-change: transform;
        }

        ::view-transition-new(root) {
          mask: ${createBlurCircleMask(blurAmount * blurFactor)} 0 0 / 100% 100% no-repeat;
          mask-position: ${x}px ${y}px;
          animation: maskScale ${duration}ms ${easing};
          transform-origin: ${x}px ${y}px;
          will-change: mask-size, mask-position;
        }

        ::view-transition-old(root),
        .dark::view-transition-old(root) {
          animation: maskScale ${duration}ms ${easing};
          transform-origin: ${x}px ${y}px;
          z-index: -1;
          will-change: mask-size, mask-position;
        }

        @keyframes maskScale {
          0% {
            mask-size: 0px;
            mask-position: ${x}px ${y}px;
          }
          100% {
            mask-size: ${finalMaskSize}px;
            mask-position: ${x - finalMaskSize / 2}px ${y - finalMaskSize / 2}px;
          }
        }
      `
      document.head.appendChild(styleElement)
    }

    if (animationType === ThemeAnimationType.POLYGON_GRADIENT) {
      const styleElement = document.createElement('style')
      styleElement.id = styleId

      // Double animation declarations: the second (linear() easing) wins in
      // browsers that support it, the first is a fallback for those that don't
      styleElement.textContent = `
        ::view-transition-group(root) {
          animation-duration: ${duration}ms;
          animation-timing-function: ease;
          animation-timing-function: ${easing};
        }

        ::view-transition-new(root) {
          mask: ${createPolygonGradientMask()} top left / 0 no-repeat;
          animation: polygonGradientScale ${duration}ms ease;
          animation: polygonGradientScale ${duration}ms ${easing};
          animation-fill-mode: both;
          will-change: mask-size;
        }

        ::view-transition-old(root),
        .${globalClassName}::view-transition-old(root) {
          animation: polygonGradientScale ${duration}ms ease;
          animation: polygonGradientScale ${duration}ms ${easing};
          animation-fill-mode: both;
          z-index: -1;
          transform-origin: top left;
        }

        @keyframes polygonGradientScale {
          to {
            mask-size: 200vmax;
          }
        }
      `
      document.head.appendChild(styleElement)
    }

    if (animationType === ThemeAnimationType.GIF && gifUrl) {
      const styleElement = document.createElement('style')
      styleElement.id = styleId

      styleElement.textContent = `
        ::view-transition-group(root) {
          animation-duration: ${duration}ms;
          animation-timing-function: ease;
          animation-timing-function: ${easing};
        }

        ::view-transition-new(root) {
          mask: url('${gifUrl}') center / 0 no-repeat;
          animation: gifMaskScale ${duration}ms ease;
          animation: gifMaskScale ${duration}ms ${easing};
          animation-fill-mode: both;
          will-change: mask-size;
        }

        ::view-transition-old(root),
        .${globalClassName}::view-transition-old(root) {
          animation: gifMaskScale ${duration}ms ease;
          animation: gifMaskScale ${duration}ms ${easing};
          animation-fill-mode: both;
          z-index: -1;
        }

        @keyframes gifMaskScale {
          0% {
            mask-size: 0;
          }
          10% {
            mask-size: 50vmax;
          }
          90% {
            mask-size: 50vmax;
          }
          100% {
            mask-size: 2000vmax;
          }
        }
      `
      document.head.appendChild(styleElement)
    }

    if (animationType === ThemeAnimationType.GIF && !gifUrl) {
      console.warn(
        'react-theme-switch-animation: `gifUrl` is required for the GIF animation type. Falling back to the circle animation.'
      )
    }

    const willBeDark = !isDarkMode

    // The reveals below are applied as mask-based CSS animations in an
    // injected stylesheet, mirroring the blur-circle/polygon-gradient
    // mechanism. WebKit supports the View Transition API but ignores both
    // WAAPI animations targeting its pseudo-elements and clip-path on them
    // (the style computes yet never clips), which left Safari running the
    // default cross-fade instead of revealing from the toggle position.
    // Mask animations render correctly in Chromium and WebKit alike. Each
    // rule declares the animation twice so browsers without linear() easing
    // fall back gracefully.
    if (animationType === ThemeAnimationType.CIRCLE || (animationType === ThemeAnimationType.GIF && !gifUrl)) {
      const circleEasing = animationType === ThemeAnimationType.CIRCLE ? easing : 'ease-in-out'
      // The mask image is a full-bleed circle, so the visible radius is half
      // the mask size; a little headroom avoids edge aliasing at the corners
      const finalMaskSize = Math.ceil(maxRadius * 2.1)
      const circleMask = `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100"><circle cx="0" cy="0" r="50" fill="white"/></svg>')`

      const styleElement = document.createElement('style')
      styleElement.id = styleId

      styleElement.textContent = `
        ${pseudoElement} {
          mask: ${circleMask} 0 0 / 0 no-repeat;
          animation: circleReveal ${duration}ms ease-in-out;
          animation: circleReveal ${duration}ms ${circleEasing};
          animation-fill-mode: both;
          will-change: mask-size, mask-position;
        }

        @keyframes circleReveal {
          from {
            mask-size: 0px;
            mask-position: ${x}px ${y}px;
          }
          to {
            mask-size: ${finalMaskSize}px;
            mask-position: ${x - finalMaskSize / 2}px ${y - finalMaskSize / 2}px;
          }
        }
      `
      document.head.appendChild(styleElement)
    }

    if (animationType === ThemeAnimationType.POLYGON) {
      // Diagonal wipe: toward dark a triangle mask grows from the top-left
      // corner, back to light it grows from the bottom-right corner
      const trianglePath = willBeDark ? 'M0 0H40L0 40V0Z' : 'M40 40H0L40 0V40Z'
      const maskPosition = willBeDark ? 'top left' : 'bottom right'
      const polygonMask = `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><path d="${trianglePath}" fill="white"/></svg>')`

      const styleElement = document.createElement('style')
      styleElement.id = styleId

      styleElement.textContent = `
        ${pseudoElement} {
          mask: ${polygonMask} ${maskPosition} / 0 no-repeat;
          animation: polygonReveal ${duration}ms ease-in-out;
          animation: polygonReveal ${duration}ms ${easing};
          animation-fill-mode: both;
          will-change: mask-size;
        }

        @keyframes polygonReveal {
          to {
            mask-size: 200vmax;
          }
        }
      `
      document.head.appendChild(styleElement)
    }

    if (animationType === ThemeAnimationType.QR_SCAN) {
      const scanLineWidth = isHighResolution ? 8 : 4
      // The scan line starts as a thin strip on one edge and expands until it
      // covers the viewport, sweeping toward the opposite edge. Percentage
      // mask positions keep the strip pinned to its starting edge as it grows.
      const scanConfig: Record<ThemeAnimationDirection, { position: string; fromSize: string }> = {
        [ThemeAnimationDirection.LTR]: { position: '0% 0%', fromSize: `${scanLineWidth}px 100%` },
        [ThemeAnimationDirection.RTL]: { position: '100% 0%', fromSize: `${scanLineWidth}px 100%` },
        [ThemeAnimationDirection.TTB]: { position: '0% 0%', fromSize: `100% ${scanLineWidth}px` },
        [ThemeAnimationDirection.BTT]: { position: '0% 100%', fromSize: `100% ${scanLineWidth}px` },
      }
      const { position, fromSize } =
        scanConfig[direction as ThemeAnimationDirection] ?? scanConfig[ThemeAnimationDirection.LTR]

      const styleElement = document.createElement('style')
      styleElement.id = styleId

      styleElement.textContent = `
        ${pseudoElement} {
          mask: linear-gradient(white, white) ${position} / ${fromSize} no-repeat;
          animation: qrScanReveal ${duration}ms ease-in-out;
          animation: qrScanReveal ${duration}ms ${easing};
          animation-fill-mode: both;
          will-change: mask-size;
        }

        @keyframes qrScanReveal {
          from {
            mask-size: ${fromSize};
          }
          to {
            mask-size: 100% 100%;
          }
        }
      `
      document.head.appendChild(styleElement)
    }

    try {
      await (document as any).startViewTransition(() => {
        flushSync(() => {
          setIsDarkMode(willBeDark)
        })
        // Apply the theme class synchronously so the "new" snapshot is always
        // captured in the target theme. Relying on the useEffect alone is racy:
        // React can defer passive effects past the snapshot capture (seen on
        // React 18 under load), which breaks the reveal animation.
        document.documentElement.classList.toggle(globalClassName, willBeDark)
      }).ready
    } catch {
      // The transition was skipped or aborted (e.g. another transition started
      // or the browser hit its snapshot deadline) — the theme is already
      // applied, so just let the cleanup below remove the animation styles
    }

    setTimeout(() => {
      const styleElement = document.getElementById(styleId)
      if (styleElement) {
        styleElement.remove()
      }
    }, duration)
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
