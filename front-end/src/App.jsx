import { useState } from 'react'
import {Route,Routes} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/RegisterUser'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/Register" element={<Register/>}/>
    </Routes>

    </>
  )
}

export default App
