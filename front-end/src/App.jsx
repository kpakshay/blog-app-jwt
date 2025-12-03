import { useState } from 'react'
import {Route,Routes} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/RegisterUser'
import MainLayout from './layout/MainLayout'
import Posts from './pages/posts'
import CreatePost from './pages/CreatePost'
import PostView from './pages/PostView'
import About from './pages/About'
import EditPost from './pages/EditPost'
import { ProtectedRoute } from './Components/ProtectedRoute'

function App() {
  //  const { showLogin, setShowLogin, showRegister, setShowRegister } = useAuth();
  return (
    <>
    <MainLayout>
    <Routes>
      {/* <Route path="/login" element={<Login/>}/> */}
      <Route path="/" element={<Home/>}/>
      {/* <Route path="/Register" element={<Register/>}/> */}
      {/* <Route path="/" element={<Home />} /> */}
        <Route path="/about" element={<About />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Blog Public */}
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/:id" element={<PostView />} />

        {/* Protected Routes */}
        <Route path="/create" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
        <Route path="/edit/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} /> 
    </Routes>
  </MainLayout>
    </>
  )
}

export default App
