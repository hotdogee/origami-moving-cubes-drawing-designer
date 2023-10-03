'use client'
import DrawMenu from '@/components/DrawMenu'
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
  const [isPreview, setIsPreview] = useState(true)
  useEffect(() => {
    if (!isPreview) {
      transformedCanvasRef.current.map((canvas, i) => {
        canvas.classList.remove(`animate-cube_${i}_out`)
        // Trigger a reflow between removing and adding the class name
        // reading the property requires a recalc
        void canvas.offsetWidth
        canvas.classList.add(`animate-cube_${i}_in`)
      })
    } else {
      transformedCanvasRef.current.map((canvas, i) => {
        canvas.classList.remove(`animate-cube_${i}_in`)
        void canvas.offsetWidth
        canvas.classList.add(`animate-cube_${i}_out`)
      })
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
          <div id="transformed-area" className="border-2">
            <div className="group grid grid-cols-3 grid-rows-3">
              {[...Array(9).keys()].map((i) => {
                return (
                  <canvas
                    key={i}
                    ref={(el) => (transformedCanvasRef.current[i] = el!)}
                    width={`300px`}
                    height={`300px`}
                    className={`w-full ${
                      i % 2 ? 'rotate-[-90deg]' : 'rotate-90'
                    }  animate-cube_${i}_out border-2 border-black object-contain ${
                      isPreview ? '' : `animate-cube_${i}_in rotate-0`
                    }`}
                  />
                )
              })}
            </div>
            <div className="flex items-center justify-center mx-auto p-4">
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
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
