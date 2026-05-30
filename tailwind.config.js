/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                charcoal: '#0a0a0a',
                electric: '#0ea5e9',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
            }
        },
    },
    plugins: [],
}