import PresentationPage from './pages/PresPage';
import Login from './pages/login';
import Home from './pages/home';
import './App.css'
import SignUp from './pages/signup';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';


function App() {


  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<PresentationPage />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/signup" element={<SignUp/>} />

          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
