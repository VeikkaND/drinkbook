import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Create from './pages/Create.jsx'
import Drinks from './pages/Drinks.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='/create' element={<Create />}/>
      <Route path='/drinks' element={<Drinks />}/>
    </Routes>
    <Footer />
  </BrowserRouter>
)
