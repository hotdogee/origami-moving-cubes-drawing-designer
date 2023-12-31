'use client'
import DarkModeToggle from '@/components/DarkModeToggle'
import LocaleSelect from '@/components/LocaleSelect'
import { DictionaryContext } from '@/context/i18n.context'
import useLocalStorageState from '@/hooks/useLocalStorageState'
import { Locale } from '@/i18n'
import kofi from '@/images/kofi.svg'
import JogWheel from '@/lib/jogwheel'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect, useRef, useState } from 'react'

export default function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const t = useContext(DictionaryContext)
  const cursorCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const cursorCtxRef = useRef<CanvasRenderingContext2D | null>(null)
  const gridCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const gridCtxRef = useRef<CanvasRenderingContext2D | null>(null)
  const drawCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const drawCtxRef = useRef<CanvasRenderingContext2D | null>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement[]>([])
  const previewCtxRef = useRef<CanvasRenderingContext2D[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [lineWidth, setLineWidth] = useLocalStorageState('lineWidth', 5)
  const [lineColor, setLineColor] = useLocalStorageState('lineColor', '#000000')
  const [lineOpacity, setLineOpacity] = useLocalStorageState('lineOpacity', 0.5)
  // preview
  const wheelRef = useRef<any | null>(null)
  const [isPreview, setIsPreview] = useState(true)
  const [seekRange, setSeekRange] = useState(1)
  // brush menu
  const [brushMenuOpen, setBrushMenuOpen] = useState(false)

  useEffect(() => {
    if (!wheelRef.current) {
      wheelRef.current = new JogWheel(document.querySelectorAll('canvas.cube'), {
        paused: true,
      })
      // console.log('init')
    } else {
      if (wheelRef.current.players[0].playState !== 'running') {
        // console.log('seek', wheelRef.current.players[0].playState)
        wheelRef.current.seek(seekRange)
        wheelRef.current.pause()
      }
    }
  }, [seekRange])

  useEffect(() => {
    if (!isPreview) {
      if (wheelRef.current.players[0].playbackRate > 0) {
        wheelRef.current.reverse()
        // console.log('reverse')
        Promise.all(
          wheelRef.current.players.map((animation: any) => animation.finished)
        ).then(() => setSeekRange(0))
      }
    } else {
      if (wheelRef.current.players[0].playbackRate < 0) {
        wheelRef.current.reverse()
        // console.log('play')
        Promise.all(
          wheelRef.current.players.map((animation: any) => animation.finished)
        ).then(() => setSeekRange(1))
      }
    }
  }, [isPreview])

  // Initialization when the component
  // mounts for the first time
  useEffect(() => {
    if (drawCtxRef.current) {
      drawCtxRef.current.lineCap = 'round'
      drawCtxRef.current.lineJoin = 'round'
      drawCtxRef.current.globalAlpha = lineOpacity
      drawCtxRef.current.strokeStyle = lineColor
      drawCtxRef.current.lineWidth = lineWidth
    }
    if (cursorCtxRef.current) {
      cursorCtxRef.current.lineCap = 'round'
      cursorCtxRef.current.lineJoin = 'round'
      cursorCtxRef.current.globalAlpha = lineOpacity
      cursorCtxRef.current.strokeStyle = lineColor
      cursorCtxRef.current.fillStyle = lineColor
      cursorCtxRef.current.lineWidth = lineWidth
    }
  }, [lineColor, lineOpacity, lineWidth])

  // draw grid
  useEffect(() => {
    if (gridCtxRef.current) {
      // gridCtxRef.current.clearRect(
      //   0,
      //   0,
      //   gridCanvasRef.current!.width,
      //   gridCanvasRef.current!.height
      // )
      // fill white background
      gridCtxRef.current.fillStyle = '#FFFFFF'
      gridCtxRef.current.fillRect(0, 0, 900, 900)

      // minor grid
      gridCtxRef.current.lineWidth = 1
      gridCtxRef.current.strokeStyle = 'rgba(150,150,150,0.4)'
      gridCtxRef.current.beginPath()
      for (let i = 0; i <= 900; i += 50) {
        gridCtxRef.current.moveTo(i, 0)
        gridCtxRef.current.lineTo(i, 900)
        gridCtxRef.current.moveTo(0, i)
        gridCtxRef.current.lineTo(900, i)
      }
      gridCtxRef.current.stroke()

      // major grid
      gridCtxRef.current.lineWidth = 2
      gridCtxRef.current.strokeStyle = 'rgba(150,150,150,0.6)'
      gridCtxRef.current.beginPath()
      for (let i = 0; i <= 900; i += 300) {
        gridCtxRef.current.moveTo(i, 0)
        gridCtxRef.current.lineTo(i, 900)
        gridCtxRef.current.moveTo(0, i)
        gridCtxRef.current.lineTo(900, i)
      }
      gridCtxRef.current.stroke()
    }
  })

  // Function for starting the drawing
  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.PointerEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault()
    const rect = drawCanvasRef.current?.getBoundingClientRect()
    const scaleX = drawCanvasRef.current?.width! / rect!.width
    const scaleY = drawCanvasRef.current?.height! / rect!.height
    drawCtxRef.current?.beginPath()
    drawCtxRef.current?.moveTo(
      e.nativeEvent.offsetX * scaleX,
      e.nativeEvent.offsetY * scaleY
    )
    setIsDrawing(true)
  }

  // Function for ending the drawing
  const endDrawing = () => {
    drawCtxRef.current?.closePath()
    setIsDrawing(false)
  }

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.PointerEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault()
    const rect = drawCanvasRef.current?.getBoundingClientRect()
    const scaleX = drawCanvasRef.current?.width! / rect!.width
    const scaleY = drawCanvasRef.current?.height! / rect!.height

    // cursor
    if (cursorCtxRef.current) {
      cursorCtxRef.current.clearRect(
        0,
        0,
        cursorCanvasRef.current!.width,
        cursorCanvasRef.current!.height
      )
      cursorCtxRef.current.beginPath()
      cursorCtxRef.current.arc(
        e.nativeEvent.offsetX * scaleX,
        e.nativeEvent.offsetY * scaleY,
        lineWidth / 2,
        0,
        2 * Math.PI
      )
      cursorCtxRef.current.fill()
    }
    // draw
    if (isDrawing) {
      drawCtxRef.current?.lineTo(
        e.nativeEvent.offsetX * scaleX,
        e.nativeEvent.offsetY * scaleY
      )
      drawCtxRef.current?.stroke()
    }
    // preview
    if (previewCtxRef.current) {
      previewCtxRef.current?.map((ctx, i) => {
        let x = i % 3
        let y = Math.floor(i / 3)
        ctx.clearRect(
          0,
          0,
          previewCanvasRef.current[i]!.width,
          previewCanvasRef.current[i]!.height
        )
        ctx.drawImage(drawCanvasRef.current!, x * 300, y * 300, 300, 300, 0, 0, 300, 300)
        ctx.drawImage(
          cursorCanvasRef.current!,
          x * 300,
          y * 300,
          300,
          300,
          0,
          0,
          300,
          300
        )
      })
    }
  }

  // const header_height = 52
  // const menu_height = 48
  // const footer_height = 40
  // const fixed_height = header_height + menu_height + footer_height
  // const half_fixed_height = fixed_height / 2
  return (
    <>
      <div
        className={`grid h-screen grid-rows-[52px_1fr_48px_1fr_40px] wide:grid-cols-[1fr_1fr] wide:grid-rows-[52px_fit-content(50vw)_minmax(48px,_1fr)_40px]`}
      >
        <header className="mx-2 flex items-center justify-between wide:col-span-2">
          <a
            href="https://cubes.hanl.in/"
            className="flex items-center justify-items-start"
          >
            <Image
              src="/icons/android-chrome-512x512.png"
              alt="Logo"
              width={40}
              height={40}
              priority
              className="h-10 drop-shadow-[0_0_2px_#000] dark:drop-shadow-[0_0_2px_#fff] dark:invert"
            />
            <h1 className="ml-2 text-base leading-tight sm:text-2xl md:text-3xl">
              {t['Origami Moving Cubes Drawing Designer']}
            </h1>
          </a>
          <menu className="flex items-center justify-items-end space-x-2">
            <DarkModeToggle />
            <LocaleSelect />
          </menu>
        </header>
        <main className="relative flex min-h-0 justify-center bg-gray-200 dark:bg-gray-600 wide:max-h-[calc(100vh-140px)]">
          <div className="relative m-4 touch-none">
            <canvas
              id="grid-canvas"
              ref={(canvas) => {
                if (canvas) {
                  gridCanvasRef.current = canvas
                  gridCtxRef.current = canvas.getContext('2d')!
                }
              }}
              width={`900px`}
              height={`900px`}
              className="absolute h-full w-full object-contain"
            />
            <canvas
              id="draw-canvas"
              ref={(canvas) => {
                if (canvas) {
                  drawCanvasRef.current = canvas
                  drawCtxRef.current = canvas.getContext('2d')!
                }
              }}
              width={`900px`}
              height={`900px`}
              className="absolute h-full w-full object-contain"
            />
            <canvas
              id="cursor-canvas"
              onPointerDown={startDrawing}
              onPointerUp={endDrawing}
              onPointerOut={endDrawing}
              onPointerMove={draw}
              ref={(canvas) => {
                if (canvas) {
                  cursorCanvasRef.current = canvas
                  cursorCtxRef.current = canvas.getContext('2d')!
                }
              }}
              width={`900px`}
              height={`900px`}
              className="absolute h-full w-full object-contain"
            />
            <canvas
              id="layout-canvas"
              width={`900px`}
              height={`900px`}
              className="h-full w-full object-contain"
            />
          </div>
        </main>
        <main className="z-10 order-4 flex min-h-0 items-center justify-center bg-gray-200 dark:bg-gray-600 wide:order-3 wide:max-h-[calc(100vh-140px)]">
          <div
            className={`grid aspect-square max-h-[calc(50vh-70px)] grid-cols-3 grid-rows-3 gap-1 p-[calc((50vh-70px)*0.15)] wide:max-h-[calc(100vh-140px)] wide:p-[calc(min((100vh-140px),100%)*0.15)]`}
          >
            {[...Array(9).keys()].map((i) => {
              return (
                <canvas
                  key={i}
                  id={`canvas${i}`}
                  ref={(canvas) => {
                    if (canvas) {
                      previewCanvasRef.current[i] = canvas
                      previewCtxRef.current[i] = canvas.getContext('2d')!
                    }
                  }}
                  width={`300px`}
                  height={`300px`}
                  className={`cube h-full w-full bg-white object-contain animate-cube_${i}`}
                />
              )
            })}
          </div>
        </main>
        <menu className="order-3 flex items-center justify-center wide:order-4 wide:col-span-2">
          <div className="relative flex flex-none items-center justify-center md:hidden md:pl-2">
            <label className="relative ml-2 inline-flex cursor-pointer items-center">
              <input
                aria-label={t['Bursh Menu Toggle']}
                type="checkbox"
                value=""
                className="peer sr-only"
                checked={brushMenuOpen}
                onChange={(e) => setBrushMenuOpen(e.target.checked)}
              />
              <div className="flex select-none items-center justify-center rounded-lg px-8 py-2 hover:bg-gray-200 peer-checked:bg-gray-300 dark:hover:bg-gray-700 dark:peer-checked:bg-gray-600">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                  viewBox="0 0 512 512"
                  className="h-5 w-5 text-gray-900 dark:text-gray-300"
                >
                  <path
                    fill="currentColor"
                    d="M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4c-37 187 131.7 326.4 258.8 306.7 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.5 97.1 368.1-26.9 204.3 5zM96 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm32-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128-64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"
                  ></path>
                </svg>
              </div>
            </label>
            <div
              className={`${
                brushMenuOpen ? 'flex' : 'hidden'
              } absolute left-2 top-12 z-40 flex h-auto w-auto flex-col space-y-6 rounded-lg bg-white p-6 text-gray-900 shadow-lg dark:bg-gray-800 dark:text-gray-300`}
            >
              <div className="flex flex-1 items-center justify-center space-x-1 text-sm leading-tight">
                <label htmlFor="color-mobile" className="w-20 flex-none">
                  {t['Brush Color']}
                </label>
                <input
                  id="color-mobile"
                  type="color"
                  value={lineColor}
                  className="flex-auto"
                  onChange={(e) => {
                    setLineColor(e.target.value)
                  }}
                />
              </div>

              <label className="flex-1 text-sm leading-tight">
                {t['Brush Width']}
                <input
                  type="range"
                  min="3"
                  max="20"
                  className="w-full"
                  value={lineWidth}
                  onChange={(e) => {
                    setLineWidth(Number(e.target.value))
                  }}
                />
              </label>

              <label className="flex-1 text-sm leading-tight">
                {t['Brush Opacity']}
                <input
                  type="range"
                  min="1"
                  max="100"
                  className="w-full"
                  value={lineOpacity * 100}
                  onChange={(e) => {
                    setLineOpacity(Number(e.target.value) / 100)
                  }}
                />
              </label>
            </div>
          </div>
          <div
            id="brush-menu"
            className="mx-2 hidden flex-1 items-center justify-center space-x-3 rounded-lg px-2 text-gray-900 dark:text-gray-300 md:flex"
          >
            <div className="flex flex-1 items-center justify-center space-x-1 text-sm leading-tight">
              <label htmlFor="color" className="w-20 flex-none">
                {t['Brush Color']}
              </label>
              <input
                id="color"
                type="color"
                value={lineColor}
                className="flex-auto"
                onChange={(e) => {
                  setLineColor(e.target.value)
                }}
              />
            </div>

            <label className="flex-1 text-sm leading-tight">
              {t['Brush Width']}
              <input
                type="range"
                min="3"
                max="20"
                className="w-full"
                value={lineWidth}
                onChange={(e) => {
                  setLineWidth(Number(e.target.value))
                }}
              />
            </label>

            <label className="flex-1 text-sm leading-tight">
              {t['Brush Opacity']}
              <input
                type="range"
                min="1"
                max="100"
                className="w-full"
                value={lineOpacity * 100}
                onChange={(e) => {
                  setLineOpacity(Number(e.target.value) / 100)
                }}
              />
            </label>
          </div>
          <div
            id="preview-menu"
            className="z-20 my-2 mr-2 flex flex-auto items-center justify-center md:mx-2 md:flex-1"
          >
            <div className="relative mx-2 inline-flex flex-none cursor-pointer items-center md:mx-4">
              <input
                id="seek-toggle"
                type="checkbox"
                value=""
                className="peer sr-only"
                checked={isPreview}
                onChange={(e) => setIsPreview(e.target.checked)}
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
              <label
                htmlFor="seek-toggle"
                className="ml-2 text-sm text-gray-900 dark:text-gray-300"
              >
                {t['Preview']}
              </label>
            </div>
            <div className="flex-auto text-sm leading-tight md:mx-4">
              <label>
                <span className="text-gray-900 dark:text-gray-300">
                  {t['Transition']}
                </span>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  className="w-full"
                  value={seekRange}
                  onChange={(e) => {
                    setSeekRange(parseFloat(e.target.value))
                  }}
                />
              </label>
            </div>
          </div>
        </menu>
        <footer className="order-5 mx-4 flex flex-row items-center justify-between text-gray-600 transition-colors dark:text-gray-400 wide:col-span-2">
          <div className="flex space-x-1 text-sm">
            {/* <div>{`© ${new Date().getFullYear()}`}</div> */}
            <div>{`Created by`}</div>
            <a
              href="https://ko-fi.com/hanlin"
              className="hover:text-gray-800 hover:drop-shadow-md dark:hover:text-gray-200"
            >
              Han Lin
            </a>
          </div>
          <Link href="https://ko-fi.com/hanlin">
            <Image src={kofi} alt={t['Buy me a coffee']} height={30} className="flex-0" />
          </Link>
          <div className="flex flex-row space-x-3">
            <div className="">
              <a href="https://github.com/hotdogee/origami-moving-cubes-drawing-designer">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 fill-current hover:text-gray-800 hover:drop-shadow-md dark:hover:text-gray-200"
                >
                  <title>GitHub icon</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>
            <div className="">
              <a href="mailto:hotdogee@gmail.com">
                <svg
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  className="h-6 w-6 fill-current hover:text-gray-800 hover:drop-shadow-md dark:hover:text-gray-200"
                >
                  <title>Mail icon</title>
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </a>
            </div>
            <div className="">
              <a href="https://x.com/hotdogee">
                <svg
                  role="img"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 16 16"
                  className="h-6 w-6 fill-current hover:text-gray-800 hover:drop-shadow-md dark:hover:text-gray-200"
                >
                  <title>X icon</title>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.5 0.5H5.75L9.48421 5.71053L14 0.5H16L10.3895 6.97368L16.5 15.5H11.25L7.51579 10.2895L3 15.5H1L6.61053 9.02632L0.5 0.5ZM12.0204 14L3.42043 2H4.97957L13.5796 14H12.0204Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </a>
            </div>
            <div className="">
              <a href="https://www.linkedin.com/in/hotdogee/">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 fill-current hover:text-gray-800 hover:drop-shadow-md dark:hover:text-gray-200"
                >
                  <title>LinkedIn icon</title>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
