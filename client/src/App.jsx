import { NavLink } from "react-router"
import SearchInput from "./components/SearchInput"
import { useEffect } from "react"
import { useState } from "react"
import drinkService from "./services/drink"
import DrinkLink from "./components/DrinkLink"

function App() {
  const [top5, setTop5] = useState([])
  useEffect(() => {
    const getTop5 = async () => {
      const res = await drinkService.getTop5()
      setTop5(res)
    }
    getTop5()
  }, [])

  return (
    <div>
      <div>
        <SearchInput />
        <p>or</p>
        <NavLink to="/create">Create your own</NavLink>
        <p>requires an account</p>
      </div>
      <div>
        <h3>Popular Drinks</h3>
        <div className="drinks">
          {top5 && top5.map((drink, i) => 
            <DrinkLink drink={drink} key={i}/>
            )}
        </div>
      </div>
    </div>
  )
}

export default App
