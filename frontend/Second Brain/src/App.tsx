
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/signin" element={<Signin/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
