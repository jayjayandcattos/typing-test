import './Timer.css'

function Timer({ timeLeft }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = (timeLeft / 30) * 100

  return (
    <div className="timer-container">
      <div className="timer-display">{formatTime(timeLeft)}</div>
      <div className="timer-progress-bar">
        <div 
          className="timer-progress-fill" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

export default Timer

