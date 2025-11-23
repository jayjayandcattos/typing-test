import './WordDisplay.css'

function WordDisplay({ word }) {
  return (
    <div className="word-display">
      <h1 className="word-text">{word || 'Loading...'}</h1>
    </div>
  )
}

export default WordDisplay

