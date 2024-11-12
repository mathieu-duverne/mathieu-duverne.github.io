import { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('')

  const handleIncrement = () => {
    // No type checking on mathematical operation
    setCount(count + 1)
  }

  const handleInputChange = (e) => {
    // No type annotation for event parameter
    setInputValue(e.target.value)
  }

  const handleSubmit = () => {
    // No type checking when parsing string to number
    setCount(count + Number(inputValue))
    setInputValue('')
  }

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={handleIncrement}>Increment</button>
      <div>
        <input 
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a number"
        />
        <button onClick={handleSubmit}>Add to counter</button>
      </div>
    </div>
  )
}

export default Counter