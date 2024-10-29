import { Routes, Route } from 'react-router-dom'
import { Navbar, Footer } from './components'
import { Home, Login, Register, Profile, PostDetail, EditPost, CreatePost } from './pages'
import './App.css'
import { UserProvider } from './context/userContext'
const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/profile/:id' element={<Profile />} />
        <Route exact path='/posts/post/:id' element={<PostDetail />} />
        <Route exact path='/write' element={<CreatePost />} />
        <Route exact path='/edit/:id' element={<EditPost />} />
      </Routes>
    </UserProvider>
  )
}
//19:36
export default App