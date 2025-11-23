import './RestartButton.css'

function RestartButton({ onClick, variant = 'default' }) {
  return (
    <button 
      className={`restart-button restart-button--${variant}`}
      onClick={onClick}
      aria-label="Restart test"
    >
      <span className="restart-icon">↻</span>
      <span className="restart-text">Restart</span>
    </button>
  )
}

export default RestartButton
