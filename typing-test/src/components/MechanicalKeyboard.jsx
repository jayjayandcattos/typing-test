import { useState, useEffect } from 'react'
import './MechanicalKeyboard.css'

function MechanicalKeyboard({ lastKey }) {
  const [isActive, setIsActive] = useState(false)
  const [rgbPhase, setRgbPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRgbPhase((prev) => (prev + 2) % 360)
    }, 30)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (lastKey) {
      setIsActive(true)
      setTimeout(() => setIsActive(false), 300)
    }
  }, [lastKey])

  const backgroundKeycaps = [
    { letter: 'W', delay: 0, x: 8, y: 20, rotateX: -25, rotateY: 30, rotateZ: -10, size: 0.65 },
    { letter: 'A', delay: 0.8, x: 5, y: 50, rotateX: -30, rotateY: 35, rotateZ: 8, size: 0.6 },
    { letter: 'S', delay: 1.6, x: 10, y: 75, rotateX: -20, rotateY: 25, rotateZ: -5, size: 0.55 },
    { letter: 'D', delay: 0.4, x: 85, y: 25, rotateX: -15, rotateY: -35, rotateZ: 15, size: 0.7 },
    { letter: 'Q', delay: 1.2, x: 88, y: 55, rotateX: -28, rotateY: -30, rotateZ: -12, size: 0.58 },
    { letter: 'E', delay: 2, x: 82, y: 78, rotateX: -18, rotateY: -25, rotateZ: 6, size: 0.62 }
  ]

  return (
    <div className="background-keycaps">
      {backgroundKeycaps.map((keycap, index) => (
        <div
          key={index}
          className="background-keycap"
          style={{
            '--rgb-hue': (rgbPhase + keycap.delay * 60) % 360,
            '--x-pos': `${keycap.x}%`,
            '--y-pos': `${keycap.y}%`,
            '--rotate-x': `${keycap.rotateX}deg`,
            '--rotate-y': `${keycap.rotateY}deg`,
            '--rotate-z': `${keycap.rotateZ}deg`,
            '--size-scale': keycap.size,
            '--anim-delay': `${keycap.delay}s`
          }}
        >
          <div className="keycap-body">
            <div className="keycap-top-surface">
              <span className="keycap-letter">{keycap.letter}</span>
            </div>
            <div className="keycap-side keycap-side-front"></div>
            <div className="keycap-side keycap-side-right"></div>
            <div className="keycap-side keycap-side-back"></div>
            <div className="keycap-side keycap-side-left"></div>
            <div className="keycap-bottom"></div>
          </div>
          <div className="mechanical-switch">
            <div className="switch-housing"></div>
            <div className="switch-stem"></div>
          </div>
          <div className="keycap-underglow"></div>
        </div>
      ))}
    </div>
  )
}

export default MechanicalKeyboard
