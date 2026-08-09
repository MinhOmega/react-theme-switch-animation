import path from 'node:path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/react-theme-switch-animation',
  // The example imports the library from ../src, so the workspace root is the repo root
  turbopack: {
    root: path.join(import.meta.dirname, '..'),
  },
}

export default nextConfig
