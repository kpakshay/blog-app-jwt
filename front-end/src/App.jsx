import {Route,Routes} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import MainLayout from './layout/MainLayout'
import Posts from './pages/posts'
import CreatePost from './pages/CreatePost'
import PostView from './pages/PostView'
import About from './pages/About'
import EditPost from './pages/EditPost'
import { ProtectedRoute } from './Components/ProtectedRoute'

function App() {
  return (
    <>
    <MainLayout>
    <Routes>
      <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About />} />

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
