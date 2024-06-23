# React Theme Switch Animation Hook

This package provides a React hook (`useModeAnimation`) for toggling dark mode in React applications with a smooth animation effect. The hook also manages the `dark` mode state and persists this setting using `localStorage`.

## Features

- Toggles dark mode with an animation effect.
- Smooth animations for theme switching.
- Uses React Hooks for state management.
- Supports TypeScript for enhanced development experience.
- Uses `localStorage` to persist the dark mode state across sessions.
- Provides a React ref that can be attached to any component to trigger the mode change.

## Installation

Install the package using npm or YARN:

```bash
npm install react-theme-switch-animation
```

or

```bash
yarn add react-theme-switch-animation
```

## Usage

Here’s how to use the `useModeAnimation` hook in your React component:

```jsx
import React from 'react'
import { useModeAnimation } from 'react-theme-switch-animation'

const MyComponent = () => {
  const { ref, toggleDarkMode, isDarkMode } = useModeAnimation()

  return (
    <button ref={ref} onClick={toggleDarkMode}>
      Toggle Dark Mode (Currently {isDarkMode ? 'Dark' : 'Light'} Mode)
    </button>
  )
}

export default MyComponent
```

## API

`useModeAnimation` accepts an optional `props` object with the following properties:

| Property        | Type   | Default                         | Description                                |
| --------------- | ------ | ------------------------------- | ------------------------------------------ |
| `duration`      | number | `750`                           | Duration of the animation in milliseconds. |
| `easing`        | string | `"ease-in-out"`                 | CSS easing type for the animation.         |
| `pseudoElement` | string | `"::view-transition-new(root)"` | Pseudo-element used for the animation.     |

Returns an object containing:

- `ref`: React ref for attaching to the component that will trigger the dark mode toggle.
- `toggleDarkMode`: Function to toggle dark mode.
- `isDarkMode`: Current state of dark mode (`true` for dark, `false` for light).

## Requirements

- React 16.8 or later (for Hooks support).
- TypeScript for compiling the package during installation.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your suggested changes.

## License

MIT