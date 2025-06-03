import { NavLink } from "react-router"


function NavBar() {
    
    return(
        <div className="navbar">
            <NavLink to="/">logo here</NavLink>
            <NavLink to="/drinks">Drinks</NavLink>
            <NavLink>some more text</NavLink>
            <div>
                <p>login thing</p>
            </div>
        </div>
    )
}

export default NavBar