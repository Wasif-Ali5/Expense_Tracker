import { useState } from 'react'
import './App.css'
import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Login/>
    </>
  )
}

export default App
