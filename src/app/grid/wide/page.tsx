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
  // const header_height = 52
  // const menu_height = 48
  // const footer_height = 40
  // const fixed_height = header_height + menu_height + footer_height
  return (
    <div className="grid h-screen grid-rows-[52px_1fr_48px_40px] bg-red-200 wide:grid-rows-[52px_fit-content(50vw)_minmax(48px,_1fr)_40px]">
      <header className="bg-orange-200">header</header>
      <main className="flex min-h-0 flex-col wide:max-h-[calc(100vh-140px)] wide:flex-row">
        <div className="min-h-0 flex-auto bg-blue-200">
          <canvas
            className="h-full w-full object-contain"
            width={`900px`}
            height={`900px`}
          ></canvas>
        </div>
        <div className="min-h-0 flex-auto bg-green-200">
          <canvas
            className="h-full w-full object-contain"
            width={`900px`}
            height={`900px`}
          ></canvas>
        </div>
      </main>
      <menu className="bg-purple-200">toolbar</menu>
      <footer className="bg-red-200">footer</footer>
    </div>
  )
}
