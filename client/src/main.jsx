import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Create from './pages/Create.jsx'
import Drinks from './pages/Drinks.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import NavBar from './components/NavBar.jsx'
import Footer from './components/Footer.jsx'
import Search from './pages/Search.jsx'
import Drink from './pages/Drink.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='/create' element={<Create />}/>
      <Route path='/drinks' element={<Drinks />}/>
      <Route path='/search' element={<Search />}/>
      <Route path='/drink/:name/:id' element={<Drink />}/>
    </Routes>
    <Footer />
  </BrowserRouter>
)
