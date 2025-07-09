import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Create from './pages/Create.jsx'
import Drinks from './pages/Drinks.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import NavBar from './components/NavBar.jsx'
import Search from './pages/Search.jsx'
import Drink from './pages/Drink.jsx'
import FindDrink from './pages/FindDrink.jsx'
import Ingredient from './pages/Ingredient.jsx'
import Profile from './pages/Profile.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/drinkbook'>
    <NavBar />
    <Routes>
      <Route path='' element={<App />}/>
      <Route path='/create' element={<Create />}/>
      <Route path='/drinks' element={<Drinks />}/>
      <Route path='/search' element={<Search />}/>
      <Route path='/drink/:name/:id' element={<Drink />}/>
      <Route path='/ingredient/:name' element={<Ingredient />}/>
      <Route path='/find' element={<FindDrink />}/>
      <Route path='/profile/:id' element={<Profile />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
    </Routes>
  </BrowserRouter>
  
)
