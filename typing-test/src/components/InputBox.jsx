import './InputBox.css'

function InputBox({ value, onChange, onKeyDown, disabled, hasError }) {
  return (
    <div className="input-box-container">
      <input
        type="text"
        className={`input-box ${hasError ? 'error' : ''}`}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        disabled={disabled}
        placeholder="Type the word here..."
        autoFocus
      />
    </div>
  )
}

export default InputBox

