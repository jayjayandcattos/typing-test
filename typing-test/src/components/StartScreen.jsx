import './StartScreen.css'

function StartScreen({ onStart }) {
  return (
    <div className="start-screen">
      <div className="start-content">
        <h1 className="start-title">Typing Speed Test</h1>
        <p className="start-description">
          Test your typing speed and accuracy. Type as many words as you can in 30 seconds!
        </p>
        <button className="start-button" onClick={onStart}>
          <span className="button-icon">⚡</span>
          <span className="button-text">Start Test</span>
        </button>
        <div className="start-instructions">
          <p>Press <kbd>Enter</kbd> or <kbd>Space</kbd> to submit each word</p>
        </div>
      </div>
    </div>
  )
}

export default StartScreen
