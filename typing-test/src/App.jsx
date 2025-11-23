import { useState, useEffect } from 'react'
import StartScreen from './components/StartScreen'
import WordDisplay from './components/WordDisplay'
import InputBox from './components/InputBox'
import Timer from './components/Timer'
import Results from './components/Results'
import RestartButton from './components/RestartButton'
import { useKeyboardSounds } from './hooks/useKeyboardSounds'
import './App.css'

function App() {
  const [gameState, setGameState] = useState('idle')
  const [currentWord, setCurrentWord] = useState('')
  const [userInput, setUserInput] = useState('')
  const [timeLeft, setTimeLeft] = useState(30)
  const [correctCount, setCorrectCount] = useState(0)
  const [totalTypedAttempts, setTotalTypedAttempts] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [hasError, setHasError] = useState(false)

  const playSound = useKeyboardSounds()

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
    if (gameState === 'playing' && !currentWord) {
      fetchWord()
    }
  }, [gameState, currentWord])

  useEffect(() => {
    if (isRunning && timeLeft > 0 && gameState === 'playing') {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState('finished')
            setIsRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [isRunning, timeLeft, gameState])

  const handleStart = () => {
    setGameState('playing')
    fetchWord()
  }

  const handleRestart = () => {
    setGameState('idle')
    setCurrentWord('')
    setUserInput('')
    setTimeLeft(30)
    setCorrectCount(0)
    setTotalTypedAttempts(0)
    setIsRunning(false)
    setHasError(false)
  }

  const handleInputChange = (e) => {
    if (gameState !== 'playing') return

    const value = e.target.value
    setUserInput(value)
    playSound('keypress')

    if (!isRunning && value.length > 0) {
      setIsRunning(true)
    }

    if (value.length > 0) {
      const currentWordLower = currentWord.toLowerCase()
      const valueLower = value.toLowerCase()
      if (!currentWordLower.startsWith(valueLower)) {
        setHasError(true)
        setTimeout(() => setHasError(false), 400)
      }
    }
  }

  const checkWord = () => {
    if (gameState !== 'playing' || !userInput.trim()) return

    const trimmedInput = userInput.trim().toLowerCase()
    const trimmedWord = currentWord.toLowerCase()

    setTotalTypedAttempts((prev) => prev + 1)

    if (trimmedInput === trimmedWord) {
      setCorrectCount((prev) => prev + 1)
      setUserInput('')
      fetchWord()
    } else {
      setHasError(true)
      setTimeout(() => setHasError(false), 400)
    }
  }

  const handleKeyDown = (e) => {
    if (gameState !== 'playing') return

    if (e.key === 'Enter') {
      e.preventDefault()
      playSound('enter')
      checkWord()
    } else if (e.key === ' ') {
      e.preventDefault()
      playSound('space')
      checkWord()
    }
  }

  return (
    <div className="app">
      <div className="app-container">
        {gameState === 'idle' && <StartScreen onStart={handleStart} />}

        {gameState === 'playing' && (
          <>
            <h1 className="app-title">Typing Speed Test</h1>
            <RestartButton onClick={handleRestart} variant="floating" />
            <Timer timeLeft={timeLeft} />
            <WordDisplay word={currentWord} />
            <InputBox
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={false}
              hasError={hasError}
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
        )}

        {gameState === 'finished' && (
          <Results
            correctCount={correctCount}
            totalTypedAttempts={totalTypedAttempts}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  )
}

export default App
