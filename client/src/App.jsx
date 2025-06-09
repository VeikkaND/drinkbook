import { NavLink } from "react-router"
import SearchInput from "./components/SearchInput"

function App() {
  

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
        <p>list some drinks here</p>
      </div>
    </div>
  )
}

export default App
