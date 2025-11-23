import './Results.css'
import RestartButton from './RestartButton'

function Results({ correctCount, totalTypedAttempts, onRestart }) {
  const wpm = totalTypedAttempts > 0 ? ((correctCount / 30) * 60).toFixed(1) : '0.0'
  const accuracy = totalTypedAttempts > 0 
    ? ((correctCount / totalTypedAttempts) * 100).toFixed(1) 
    : '0.0'

  return (
    <div className="results-container">
      <h2 className="results-title">Time's Up!</h2>
      <div className="results-stats">
        <div className="stat-card">
          <div className="stat-label">Words Per Minute</div>
          <div className="stat-value">{wpm}</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Accuracy</div>
          <div className="stat-value">{accuracy}%</div>
        </div>
      </div>
      <div className="results-details">
        <p>Correct: {correctCount}</p>
        <p>Total Attempts: {totalTypedAttempts}</p>
      </div>
      <RestartButton onClick={onRestart} variant="results" />
    </div>
  )
}

export default Results

