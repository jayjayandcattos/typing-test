import { useState } from 'react'
import './VolumeControl.css'

function VolumeControl({ onVolumeChange, initialVolume = 10 }) {
  const [volume, setVolume] = useState(initialVolume)

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value)
    setVolume(newVolume)
    onVolumeChange(newVolume)
  }

  const getVolumeIcon = () => {
    if (volume === 0) return '🔇'
    if (volume < 30) return '🔈'
    if (volume < 70) return '🔉'
    return '🔊'
  }

  return (
    <div className="volume-control">
      <span className="volume-icon">{getVolumeIcon()}</span>
      <input
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleVolumeChange}
        className="volume-slider"
        aria-label="Volume control"
      />
      <span className="volume-percentage">{volume}%</span>
    </div>
  )
}

export default VolumeControl
