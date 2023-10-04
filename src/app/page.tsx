'use client'
import DrawMenu from '@/components/DrawMenu'
import JogWheel from '@/lib/jogwheel'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const drawCanvasRef = useRef<HTMLCanvasElement>(null)
  const transformedCanvasRef = useRef<HTMLCanvasElement[]>([])
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const transformedCtxRef = useRef<CanvasRenderingContext2D[] | null>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [lineWidth, setLineWidth] = useState(5)
  const [lineColor, setLineColor] = useState('black')
  const [lineOpacity, setLineOpacity] = useState(0.1)
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
    const ctx = drawCanvasRef.current?.getContext('2d')!
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.globalAlpha = lineOpacity
    ctx.strokeStyle = lineColor
    ctx.lineWidth = lineWidth
    ctxRef.current = ctx
    transformedCtxRef.current = transformedCanvasRef.current
      .map((canvas) => canvas.getContext('2d'))
      .filter((ctx) => ctx !== null) as CanvasRenderingContext2D[]
  }, [lineColor, lineOpacity, lineWidth])

  // Function for starting the drawing
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    let rect = drawCanvasRef.current?.getBoundingClientRect(),
      scaleX = drawCanvasRef.current?.width! / rect!.width,
      scaleY = drawCanvasRef.current?.height! / rect!.height
    ctxRef.current?.beginPath()
    ctxRef.current?.moveTo(e.nativeEvent.offsetX * scaleX, e.nativeEvent.offsetY * scaleY)
    setIsDrawing(true)
  }

  // Function for ending the drawing
  const endDrawing = () => {
    ctxRef.current?.closePath()
    setIsDrawing(false)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {
      return
    }
    let rect = drawCanvasRef.current?.getBoundingClientRect(),
      scaleX = drawCanvasRef.current?.width! / rect!.width,
      scaleY = drawCanvasRef.current?.height! / rect!.height
    ctxRef.current?.lineTo(e.nativeEvent.offsetX * scaleX, e.nativeEvent.offsetY * scaleY)
    ctxRef.current?.stroke()
    transformedCtxRef.current?.map((ctx, i) => {
      let x = i % 3
      let y = Math.floor(i / 3)
      ctx.drawImage(drawCanvasRef.current!, x * 300, y * 300, 300, 300, 0, 0, 300, 300)
    })
  }

  return (
    <>
      <header className="container mx-auto my-4 flex items-center justify-center">
        <h1 className="text-3xl">Origami Moving Cubes Drawing Designer</h1>
      </header>
      <main className="container mx-auto">
        <div className="grid grid-cols-2">
          <div id="draw-area" className="border-2">
            <canvas
              id="draw-canvas"
              onMouseDown={startDrawing}
              onMouseUp={endDrawing}
              onMouseOut={endDrawing}
              onMouseMove={draw}
              ref={drawCanvasRef}
              width={`900px`}
              height={`900px`}
              className="w-full bg-[url('/images/grid.png')] bg-contain bg-no-repeat object-contain"
            />
            <DrawMenu setLineColor={setLineColor} setLineWidth={setLineWidth} setLineOpacity={setLineOpacity} />
          </div>
          <div id="transformed-area" className="border-2 flex flex-col">
            <div className="group grid grid-cols-3 grid-rows-3 z-10">
              {[...Array(9).keys()].map((i) => {
                return (
                  <canvas
                    key={i}
                    id={`canvas${i}`}
                    ref={(el) => (transformedCanvasRef.current[i] = el!)}
                    width={`300px`}
                    height={`300px`}
                    className={`cube w-full border-2 border-black object-contain animate-cube_${i}_out`}
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
