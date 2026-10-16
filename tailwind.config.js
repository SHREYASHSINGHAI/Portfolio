/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                obsidian: '#080C14',
                graphite: '#0F172A',
                panel: 'rgba(15, 23, 42, 0.75)',
                charcoal: '#080C14',
                electric: '#06B6D4',
                phosphor: {
                    cyan: '#06B6D4',
                    cyanGlow: '#22D3EE',
                    emerald: '#10B981',
                    emeraldGlow: '#34D399',
                    amber: '#F59E0B',
                    amberGlow: '#FBBF24',
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
                mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
            },
            borderColor: {
                telemetry: 'rgba(255, 255, 255, 0.08)',
                'telemetry-light': 'rgba(255, 255, 255, 0.14)',
            },
            animation: {
                'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'scanline': 'scanline 8s linear infinite',
            },
            keyframes: {
                scanline: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(1000%)' },
                }
            }
        },
    },
    plugins: [],
}