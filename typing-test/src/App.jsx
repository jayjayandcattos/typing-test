import { useState, useEffect } from 'react'
import WordDisplay from './components/WordDisplay'
import InputBox from './components/InputBox'
import Timer from './components/Timer'
import Results from './components/Results'
import './App.css'

function App() {
  const [currentWord, setCurrentWord] = useState('')
  const [userInput, setUserInput] = useState('')
  const [timeLeft, setTimeLeft] = useState(30)
  const [correctCount, setCorrectCount] = useState(0)
  const [totalTypedAttempts, setTotalTypedAttempts] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  const fetchWord = async () => {
    try {
      const response = await fetch('https://random-word-api.herokuapp.com/word?number=1')
      const data = await response.json()
      if (data && data.length > 0) {
        setCurrentWord(data[0])
      }
    } catch (error) {
      console.error('Error fetching word:', error)
      
      setCurrentWord('error')
    }
  }

  useEffect(() => {
    fetchWord()
  }, [])

  useEffect(() => {
    if (isRunning && timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameOver(true)
            setIsRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isRunning, timeLeft, gameOver])

  const handleInputChange = (e) => {
    if (gameOver) return
    
    const value = e.target.value
    setUserInput(value)

    // Start timer on first input
    if (!isRunning && value.length > 0) {
      setIsRunning(true)
    }
  }

  const checkWord = () => {
    if (gameOver || !userInput.trim()) return

    const trimmedInput = userInput.trim().toLowerCase()
    const trimmedWord = currentWord.toLowerCase()

    setTotalTypedAttempts((prev) => prev + 1)

    if (trimmedInput === trimmedWord) {
      setCorrectCount((prev) => prev + 1)
      setUserInput('')
      fetchWord()
    }
  }

  const handleKeyDown = (e) => {
    if (gameOver) return

    // Check word on Enter or Space
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      checkWord()
    }
  }

  return (
    <div className="app">
      <div className="app-container">
        <h1 className="app-title">Typing Speed Test</h1>
        
        {!gameOver ? (
          <>
            <Timer timeLeft={timeLeft} />
            <WordDisplay word={currentWord} />
            <InputBox
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={gameOver}
            />
            <div className="stats">
              <div className="stat-item">
                <span className="stat-label">Correct:</span>
                <span className="stat-value">{correctCount}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Attempts:</span>
                <span className="stat-value">{totalTypedAttempts}</span>
              </div>
            </div>
          </>
        ) : (
          <Results 
            correctCount={correctCount} 
            totalTypedAttempts={totalTypedAttempts} 
          />
        )}
      </div>
    </div>
  )
}

export default App

