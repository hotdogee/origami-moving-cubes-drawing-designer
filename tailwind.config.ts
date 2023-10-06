import type { Config } from 'tailwindcss'

let config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  safelist: [
    {
      pattern: /animate-cube_[0-9]/,
    },
  ],
  theme: {
    extend: {
      screens: {
        tall: { raw: '(max-aspect-ratio: 1/1)' },
        wide: { raw: '(min-aspect-ratio: 1/1)' },
      },
      keyframes: {},
      animation: {},
    },
  },
  plugins: [],
}

;[...Array(9).keys()].map((i) => {
  let isClockwise = i % 2 === 0 ? 1 : -1
  let x = i % 3
  let y = Math.floor(i / 3)
  let yDirection = y === 0 ? -1 : y === 1 ? 0 : 1
  let xDirection = x === 0 ? -1 : x === 1 ? 0 : 1
  if (config?.theme?.extend?.keyframes) {
    ;(config.theme.extend.keyframes as Record<string, Record<string, Record<string, string>>>)[`cube_${i}`] = {}
    ;[...Array(11).keys()].map((k) => {
      if (config?.theme?.extend?.keyframes) {
        ;(config.theme.extend.keyframes as Record<string, Record<string, Record<string, string>>>)[`cube_${i}`][
          `${k * 10}%`
        ] = {
          transform: `translateY(calc(100%*${
            yDirection * (Math.cos(((k * 9 - 45) / 180) * Math.PI) / Math.cos((45 / 180) * Math.PI) - 1)
          })) translateX(calc(100%*${
            xDirection * (Math.cos(((k * 9 - 45) / 180) * Math.PI) / Math.cos((45 / 180) * Math.PI) - 1)
          })) rotate(${isClockwise * k * 9}deg) `,
        }
      }
    })
  }
  if (config?.theme?.extend?.animation) {
    ;(config.theme.extend.animation as Record<string, string>)[`cube_${i}`] = `cube_${i} 1s linear 1 forwards`
  }
})

export default config
