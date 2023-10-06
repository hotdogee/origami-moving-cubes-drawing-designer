'use client'
import { useEffect } from 'react'

export default function TestPage() {
  useEffect(() => {
    var canvas = document.querySelectorAll('canvas')
    for (var i = 0; i < canvas.length; i++) {
      let ctx = canvas[i].getContext('2d')
      ctx!.fillStyle = '#999'
      ctx!.fillRect(0, 0, 900, 900)
    }
  }, [])
  return (
    <div className="flex h-screen flex-col bg-red-200">
      <div className="h-10 flex-none bg-orange-200">header</div>
      <div className="min-h-0 flex-auto bg-blue-200">
        <canvas className="h-full w-full object-contain" width={`900px`} height={`900px`}></canvas>
      </div>
      <div className="min-h-0 flex-auto bg-green-200">
        <canvas className="h-full w-full object-contain" width={`900px`} height={`900px`}></canvas>
      </div>
      <div className="h-10 flex-none bg-purple-200">toolbar</div>
    </div>
  )
}
