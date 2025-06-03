import { useEffect } from "react"
import { NavLink } from "react-router"


function App() {
  useEffect(() => {

  }, [])

  return (
    <div>
      <div>
        <form>
          <h3>Search for a drink</h3>
          <input placeholder="Vodka martini"></input>
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
