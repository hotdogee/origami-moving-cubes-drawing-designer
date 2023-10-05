'use client'
import DarkModeToggle from '@/components/DarkModeToggle'
import JogWheel from '@/lib/jogwheel'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const drawCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const drawCtxRef = useRef<CanvasRenderingContext2D | null>(null)
  const cursorCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const cursorCtxRef = useRef<CanvasRenderingContext2D | null>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement[]>([])
  const previewCtxRef = useRef<CanvasRenderingContext2D[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [lineWidth, setLineWidth] = useState(5)
  const [lineColor, setLineColor] = useState('black')
  const [lineOpacity, setLineOpacity] = useState(0.5)
  // Preview
  const wheelRef = useRef<any | null>(null)
  const [isPreview, setIsPreview] = useState(true)
  const [seekRange, setSeekRange] = useState(1)

  useEffect(() => {
    if (!wheelRef.current) {
      wheelRef.current = new JogWheel(document.querySelectorAll('canvas.cube'), {
        paused: true,
      })
      console.log('init')
    } else {
      if (wheelRef.current.players[0].playState !== 'running') {
        console.log('seek', wheelRef.current.players[0].playState)
        wheelRef.current.seek(seekRange)
        wheelRef.current.pause()
      }
    }
  }, [seekRange])

  useEffect(() => {
    if (!isPreview) {
      if (wheelRef.current.players[0].playbackRate > 0) {
        wheelRef.current.reverse()
        console.log('reverse')
        Promise.all(wheelRef.current.players.map((animation: any) => animation.finished)).then(() => setSeekRange(0))
      }
    } else {
      if (wheelRef.current.players[0].playbackRate < 0) {
        wheelRef.current.reverse()
        console.log('play')
        Promise.all(wheelRef.current.players.map((animation: any) => animation.finished)).then(() => setSeekRange(1))
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

  // Function for starting the drawing
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = drawCanvasRef.current?.getBoundingClientRect()
    const scaleX = drawCanvasRef.current?.width! / rect!.width
    const scaleY = drawCanvasRef.current?.height! / rect!.height
    drawCtxRef.current?.beginPath()
    drawCtxRef.current?.moveTo(e.nativeEvent.offsetX * scaleX, e.nativeEvent.offsetY * scaleY)
    setIsDrawing(true)
  }

  // Function for ending the drawing
  const endDrawing = () => {
    drawCtxRef.current?.closePath()
    setIsDrawing(false)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = drawCanvasRef.current?.getBoundingClientRect()
    const scaleX = drawCanvasRef.current?.width! / rect!.width
    const scaleY = drawCanvasRef.current?.height! / rect!.height
    // cursor
    if (cursorCtxRef.current) {
      cursorCtxRef.current.clearRect(0, 0, cursorCanvasRef.current!.width, cursorCanvasRef.current!.height)
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
      drawCtxRef.current?.lineTo(e.nativeEvent.offsetX * scaleX, e.nativeEvent.offsetY * scaleY)
      drawCtxRef.current?.stroke()
    }
    // preview
    if (previewCtxRef.current) {
      previewCtxRef.current?.map((ctx, i) => {
        let x = i % 3
        let y = Math.floor(i / 3)
        ctx.clearRect(0, 0, previewCanvasRef.current[i]!.width, previewCanvasRef.current[i]!.height)
        ctx.drawImage(drawCanvasRef.current!, x * 300, y * 300, 300, 300, 0, 0, 300, 300)
        ctx.drawImage(cursorCanvasRef.current!, x * 300, y * 300, 300, 300, 0, 0, 300, 300)
      })
    }
  }

  return (
    <>
      <header className="container mx-auto my-4 flex items-center justify-between">
        <h1 className="text-3xl">Origami Moving Cubes Drawing Designer</h1>
        <DarkModeToggle />
      </header>
      <main className="container mx-auto">
        <div className="grid grid-cols-2">
          <div id="draw-area" className="border-2">
            <div className="bg-white relative">
              <canvas
                id="cursor-canvas"
                onMouseDown={startDrawing}
                onMouseUp={endDrawing}
                onMouseOut={endDrawing}
                onMouseMove={draw}
                ref={(canvas) => {
                  if (canvas) {
                    cursorCanvasRef.current = canvas
                    cursorCtxRef.current = canvas.getContext('2d')!
                  }
                }}
                width={`900px`}
                height={`900px`}
                className="absolute w-full"
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
                className="w-full bg-[url('/images/grid.png')] bg-contain bg-no-repeat object-contain"
              />
            </div>
            <div
              id="Menu"
              className="mx-auto mt-2 flex h-12 w-[650px] items-center justify-evenly rounded-lg bg-gray-400/20"
            >
              <label>Brush Color </label>
              <input
                type="color"
                value={lineColor}
                onChange={(e) => {
                  setLineColor(e.target.value)
                }}
              />
              <label>Brush Width </label>
              <input
                type="range"
                min="3"
                max="20"
                value={lineWidth}
                onChange={(e) => {
                  setLineWidth(Number(e.target.value))
                }}
              />
              <label>Brush Opacity</label>
              <input
                type="range"
                min="1"
                max="100"
                value={lineOpacity * 100}
                onChange={(e) => {
                  setLineOpacity(Number(e.target.value) / 100)
                }}
              />
            </div>
          </div>
          <div id="transformed-area" className="border-2 flex flex-col">
            <div className="group grid grid-cols-3 grid-rows-3 z-10 dark:bg-gray-600">
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
                    className={`cube w-full bg-white border-2 border-black object-contain animate-cube_${i}_out`}
                  />
                )
              })}
            </div>

            <div id="preview-menu" className="flex items-center justify-center mx-10 my-2 h-12 z-20">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={isPreview}
                  onChange={(e) => setIsPreview(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Preview</span>
              </label>
              <input
                type="range"
                className="flex-1 m-10 transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
                min={0}
                max={1}
                step={0.01}
                value={seekRange}
                onChange={(e) => {
                  setSeekRange(parseFloat(e.target.value))
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
