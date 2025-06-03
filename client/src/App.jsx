import { useEffect } from "react"
import { NavLink, useNavigate } from "react-router"
import drinkService from "./services/drink"
import { useState } from "react"

function App() {
  const [drinkNames, setDrinkNames] = useState([])
  useEffect(() => {
    //fetch all drink names
    const getNames = async () => {
      const names = await drinkService.getAllDrinkNames()
      setDrinkNames(names)
    }
    getNames()
  }, [])

  const navigate = useNavigate()

  const handleSearch = (event) => {
    console.log(event.target.input.value)
    navigate("/search")
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSearch}>
          <h3>Search for a drink</h3>
          <input placeholder="vodka martini" name="input" 
          autoComplete="off"></input>
        </form>
        <p>or</p>
        <NavLink to="/create">Create your own</NavLink>
        <p>requires an account</p>
      </div>
      <div>
        <p>list some drinks here</p>
      </div>
    </div>
  )
}

export default App
