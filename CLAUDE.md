# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React library for animated theme switching, supporting smooth circle and blur-circle animations when toggling between light and dark modes. The library is built with TypeScript and published to npm.

## Key Commands

### Development

- `npm run build` - Build TypeScript to dist/ directory
- `npm run lint` - Run ESLint on all JS/TS files
- `npm run lint:fix` - Auto-fix ESLint issues and format styles
- `npm run format` - Format code with Prettier

### Example App (in /example directory)

- `cd example && npm run dev` - Start Next.js development server
- `cd example && npm run build` - Build Next.js app
- `cd example && npm run lint` - Run Next.js linting

### Release

- `npm run release` - Create new release with release-it (handles versioning, changelog, git tags, npm publish)

## Architecture

### Core Hook (`src/index.ts`)

The `useModeAnimation` hook is the main export that provides:

- Theme state management (localStorage persistence)
- View Transition API integration for smooth animations
- Six animation types: `CIRCLE`, `BLUR_CIRCLE`, `QR_SCAN`, `POLYGON`, `POLYGON_GRADIENT`, and `GIF`
- High-resolution display optimizations (>= 3000px width/height)
- Accessibility support (respects `prefers-reduced-motion`)

### Animation Implementation

- Uses the View Transition API (`document.startViewTransition`)
- Circle animation: CSS `clip-path` with expanding circle
- Blur circle animation: SVG mask with Gaussian blur filter
- QR scan animation: CSS `clip-path` polygon sweeping left to right
- Polygon animation: CSS `clip-path` diagonal wipe (direction depends on target theme)
- Polygon gradient animation: SVG mask with gradient triangle scaling from the top-left corner
- GIF animation: custom GIF used as a CSS mask that scales up to reveal the new theme (requires `gifUrl` prop)
- Dynamic calculations for optimal circle positioning and sizing
- Performance optimizations for high-resolution displays

### Build Output

- `dist/index.js` - Compiled JavaScript
- `dist/index.d.ts` - TypeScript declarations
- `dist/style.css` - Any associated styles

## Development Notes

### Code Style

- Uses ESLint with Prettier configuration
- Pre-commit hooks ensure code formatting
- TypeScript strict mode enabled
- React 17+ compatibility maintained

### Browser Support

- Requires View Transition API support or graceful degradation
- Client-side only (not SSR compatible without `use client` directive)
- TailwindCSS dark mode integration

### Testing the Library

Use the example Next.js app in `/example` directory to test changes:

1. Build the library: `npm run build`
2. Navigate to example: `cd example`
3. Start dev server: `npm run dev`
4. Test theme switching functionality

The example demonstrates both animation types and integration patterns.
