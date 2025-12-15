import {Route,Routes} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored"/>
  </MainLayout>
    </>
  )
}

export default App
