// src/components/GestureCanvas.tsx
import React, { useRef, useEffect } from 'react'
import OneDollar from '../oneDollar'

interface Props {
  onGestureRecognized: (name: string) => void
}

export default function GestureCanvas({ onGestureRecognized }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointsRef = useRef<number[][]>([])
 const recognizer = useRef<OneDollar | null>(null)

  useEffect(() => {
    // initialize recognizer
    recognizer.current = new OneDollar({ /* options */ })
  }, [])

  useEffect(() => {
    const cvs = canvasRef.current!
    // block default touch gestures
    cvs.style.touchAction = 'none'
    let paint = false

    function addClick(x: number, y: number) {
      pointsRef.current.push([x, y])
    }
    function redraw() {
      const ctx = cvs.getContext('2d')!
      const { width, height } = cvs.getBoundingClientRect()
      cvs.width = width; cvs.height = height
      ctx.clearRect(0, 0, width, height)
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 3
      ctx.beginPath()
      pointsRef.current.forEach(([x, y], i) => {
        const X = x * width, Y = y * height
        if (i === 0) ctx.moveTo(X, Y)
        else ctx.lineTo(X, Y)
      })
      ctx.stroke()
    }

    function pointerDown(ev: PointerEvent) {
      paint = true
      pointsRef.current = []
      pointerMove(ev)
    }
    function pointerMove(ev: PointerEvent) {
      if (!paint) return
      const r = cvs.getBoundingClientRect()
      addClick((ev.clientX - r.left) / r.width, (ev.clientY - r.top) / r.height)
      redraw()
    }
    function pointerUp() {
      paint = false
      // check gesture
      const res = recognizer.current!.check(pointsRef.current)
      if (res.recognized) onGestureRecognized(res.name!)
    }

    cvs.addEventListener('pointerdown', pointerDown)
    cvs.addEventListener('pointermove', pointerMove)
    cvs.addEventListener('pointerup', pointerUp)
    return () => {
      cvs.removeEventListener('pointerdown', pointerDown)
      cvs.removeEventListener('pointermove', pointerMove)
      cvs.removeEventListener('pointerup', pointerUp)
    }
  }, [onGestureRecognized])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-40 bg-blue-800 rounded-lg"
    />
  )
}
