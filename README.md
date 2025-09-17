<h1 align="center">
  <h1 align="center">React Theme Switch Animation Hook</h1>
  <p align="center">
  Beautiful, smooth animations for theme switching in React applications. Built with TypeScript and powered by the View Transition API.
  </p>
</h1>

<p align="center">
  <strong>
    <a href="https://minhomega.github.io/react-theme-switch-animation/" target="_blank">🚀 Live Demo</a> |
    <a href="https://www.npmjs.com/package/react-theme-switch-animation" target="_blank">📦 npm Package</a> |
    <a href="https://github.com/minhomega/" target="_blank">💼 Hire me</a>
  </strong>
</p>

## 🎥 Demo

<p align="center">
  <img src="https://github.com/user-attachments/assets/b09898f4-c0ed-48dd-817c-c9f89bfecf2e">
</p>

### ✨ Three Animation Types Available

- **🔵 Circle**: Smooth expanding circle transition
- **🌀 Blur Circle**: Circle with elegant blur effect on the edges
- **📱 QR Scan**: Scanning line sweeps left to right (like QR code reader)

## 📝 Notes

- The hook is only available in the browser environment. So if you use NextJS App router or any other framework that uses Server Components, you should use this hook in a Client Component by adding the directive [`use client`](https://react.dev/reference/react/use-client)
- Currently works only if the project is using TailwindCSS
- Ensure your project has the necessary TailwindCSS configuration for dark mode

## 🚀 Features

- **🎨 Multiple Animation Types**: Circle, Blur Circle, and QR Scan animations
- **⚡ High Performance**: Optimized for high-resolution displays with smooth 60fps animations
- **🎯 View Transition API**: Leverages modern browser APIs for seamless transitions
- **📱 Responsive Design**: Works perfectly across all device sizes and screen resolutions
- **♿ Accessibility First**: Respects `prefers-reduced-motion` and provides fallback experiences
- **🔧 TypeScript Support**: Full TypeScript support for enhanced development experience
- **💾 State Persistence**: Uses `localStorage` to persist theme state across sessions
- **🎛️ Highly Customizable**: Configure duration, easing, blur amount, and more
- **🪝 React Hooks**: Clean, modern React Hooks API

## 📦 Installation

Install the package using npm or YARN:

```bash
npm install react-theme-switch-animation
```

or

```bash
yarn add react-theme-switch-animation
```

## 📚 Usage

Here’s how to use the `useModeAnimation` hook in your React component:

```jsx
'use client'

import React from 'react'
import { useModeAnimation } from 'react-theme-switch-animation'

const MyComponent = () => {
  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation()

  return (
    <button ref={ref} onClick={toggleSwitchTheme}>
      Toggle Dark Mode (Currently {isDarkMode ? 'Dark' : 'Light'} Mode)
    </button>
  )
}

export default MyComponent
```

## 📚 API

`useModeAnimation` accepts an optional `props` object with the following properties:

| Property           | Type                      | Default                         | Description                                                   |
| ------------------ | ------------------------- | ------------------------------- | ------------------------------------------------------------- |
| `duration`         | number                    | `750`                           | Duration of the animation in milliseconds.                    |
| `easing`           | string                    | `"ease-in-out"`                 | CSS easing type for the animation.                            |
| `pseudoElement`    | string                    | `"::view-transition-new(root)"` | Pseudo-element used for the animation.                        |
| `globalClassName`  | string                    | `"dark"`                        | Class name to apply to the root element.                      |
| `animationType`    | ThemeAnimationType        | `ThemeAnimationType.CIRCLE`     | Type of animation effect (`CIRCLE`, `BLUR_CIRCLE`, `QR_SCAN`) |
| `blurAmount`       | number                    | `2`                             | Blur intensity for blur circle animation.                     |
| `styleId`          | string                    | `"theme-switch-style"`          | ID for the style element (blur circle animation).             |
| `isDarkMode`       | boolean                   | `false`                         | Initial dark mode state.                                      |
| `onDarkModeChange` | (isDark: boolean) => void | `undefined`                     | Callback function to handle dark mode change.                 |

### Animation Types

The hook supports three types of animations:

- `ThemeAnimationType.CIRCLE`: A clean circle expansion animation (default)
- `ThemeAnimationType.BLUR_CIRCLE`: A circle expansion with blur effect on the edges
- `ThemeAnimationType.QR_SCAN`: A scanning line that sweeps from left to right

### Examples for Each Animation Type

#### Circle Animation (Default)

```jsx
'use client'

import React from 'react'
import { ThemeAnimationType, useModeAnimation } from 'react-theme-switch-animation'

const CircleAnimation = () => {
  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation({
    animationType: ThemeAnimationType.CIRCLE,
  })

  return (
    <button ref={ref} onClick={toggleSwitchTheme}>
      {isDarkMode ? '🌙' : '☀️'} Toggle Theme
    </button>
  )
}
```

#### Blur Circle Animation

```jsx
'use client'

import React from 'react'
import { ThemeAnimationType, useModeAnimation } from 'react-theme-switch-animation'

const BlurCircleAnimation = () => {
  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation({
    animationType: ThemeAnimationType.BLUR_CIRCLE,
    blurAmount: 4, // Optional: adjust blur intensity
    duration: 1000, // Optional: adjust animation duration
  })

  return (
    <button ref={ref} onClick={toggleSwitchTheme}>
      {isDarkMode ? '🌙' : '☀️'} Toggle Theme (Blur)
    </button>
  )
}
```

#### QR Scan Animation

```jsx
'use client'

import React from 'react'
import { ThemeAnimationType, useModeAnimation } from 'react-theme-switch-animation'

const QRScanAnimation = () => {
  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation({
    animationType: ThemeAnimationType.QR_SCAN,
    duration: 500, // Faster scan animation
  })

  return (
    <button ref={ref} onClick={toggleSwitchTheme}>
      {isDarkMode ? '🌙' : '☀️'} Toggle Theme (QR Scan)
    </button>
  )
}
```

Returns an object containing:

- `ref`: React ref for attaching to the component that will trigger the dark mode toggle.
- `toggleSwitchTheme`: Function to toggle dark mode.
- `isDarkMode`: Current state of dark mode (`true` for dark, `false` for light).

## ⚡ Performance & Optimization

This library is built with performance in mind:

- **High-Resolution Display Support**: Automatically detects and optimizes for displays ≥3000px width/height
- **Adaptive Animation Duration**: Reduces duration by 20% on high-res displays for smoother experience
- **GPU Acceleration**: Uses hardware-accelerated CSS properties (`transform`, `clip-path`, `mask`)
- **Memory Efficient**: Automatic cleanup of style elements and event listeners
- **Accessibility**: Respects `prefers-reduced-motion` for users who prefer minimal animations

## 🌐 Browser Support

- **Modern Browsers**: Chrome 111+, Firefox 103+, Safari 16.4+
- **View Transition API**: Falls back gracefully on unsupported browsers
- **Progressive Enhancement**: Basic theme switching works everywhere, animations enhance the experience

## 📝 Requirements

- React 16.8 or later (for Hooks support)
- TypeScript for compiling the package during installation
- TailwindCSS for styling (ensure dark mode is configured)

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request with your suggested changes.

## 📜 License

MIT
