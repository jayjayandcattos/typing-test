import { useState, useEffect } from 'react'
import './MechanicalKeyboard.css'

function MechanicalKeyboard({ lastKey }) {
  const [isActive, setIsActive] = useState(false)
  const [rgbPhase, setRgbPhase] = useState(0)

  // RGB animation loop - faster for more dynamic effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRgbPhase((prev) => (prev + 2) % 360)
    }, 30)
    return () => clearInterval(interval)
  }, [])

  // Handle key press animation
  useEffect(() => {
    if (lastKey) {
      setIsActive(true)
      setTimeout(() => setIsActive(false), 300)
    }
  }, [lastKey])

  // Background keycaps data - WIDER and unique rotations
  const backgroundKeycaps = [
    { letter: 'W', delay: 0, x: 5, y: 15, rotateX: -25, rotateY: 30, rotateZ: -10, size: 0.7 },
    { letter: 'A', delay: 0.5, x: 88, y: 10, rotateX: -15, rotateY: -35, rotateZ: 15, size: 0.6 },
    { letter: 'S', delay: 1, x: 8, y: 70, rotateX: -30, rotateY: 20, rotateZ: 5, size: 0.5 },
    { letter: 'D', delay: 1.5, x: 85, y: 75, rotateX: -20, rotateY: -25, rotateZ: -20, size: 0.65 },
    { letter: 'Q', delay: 2, x: 3, y: 45, rotateX: -35, rotateY: 35, rotateZ: 12, size: 0.45 },
    { letter: 'E', delay: 2.5, x: 90, y: 42, rotateX: -18, rotateY: -30, rotateZ: -8, size: 0.55 }
  ]

  return (
    <>
      {/* Background keycaps */}
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

      {/* Main floating keycap */}
      <div className="floating-keycap-container">
        <div 
          className={`floating-keycap ${isActive ? 'active' : ''}`}
          style={{
            '--rgb-hue': rgbPhase
          }}
        >
          <div className="keycap-body">
            <div className="keycap-top-surface">
              <span className="keycap-letter">K</span>
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
          <div className="keycap-reflection"></div>
        </div>
      </div>
    </>
  )
}

export default MechanicalKeyboard
