'use client'
import { useEffect } from 'react'

export default function TestPage() {
  useEffect(() => {
    var canvas = document.querySelectorAll('canvas')
    for (var i = 0; i < canvas.length; i++) {
      let ctx = canvas[i].getContext('2d')
      ctx.fillStyle = '#999'
      ctx.fillRect(0, 0, 900, 900)
    }
  }, [])
  return (
    <div className="bg-red-200 h-screen flex flex-col">
      <div className="bg-orange-200 flex-none h-10">header</div>
      <div className="bg-blue-200 flex-auto min-h-0">
        <canvas className="object-contain h-full w-full" width={`900px`} height={`900px`}></canvas>
      </div>
      <div className="bg-green-200 flex-auto min-h-0">
        <canvas className="object-contain h-full w-full" width={`900px`} height={`900px`}></canvas>
      </div>
      <div className="bg-purple-200 flex-none h-10">toolbar</div>
    </div>
  )
}
