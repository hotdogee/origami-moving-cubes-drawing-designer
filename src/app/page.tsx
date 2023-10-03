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
                    } group-hover:animate-cube_${i}_in animate-cube_${i}_out border-2 border-black object-contain group-hover:rotate-0`}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
