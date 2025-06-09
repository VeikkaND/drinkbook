import { useEffect } from "react"
import drinkService from "../services/drink"
import { useState } from "react"
import { NavLink } from "react-router"
import DrinkLink from "../components/DrinkLink"
import SearchInput from "../components/SearchInput"

function Drinks() {
    const [drinks, setDrinks] = useState([])
    useEffect(() => {
        const getDrinks = async () => {
            const res = await drinkService.getAllDrinks()
            setDrinks(res)
        }
        getDrinks()
    }, [])

    /*
            <NavLink key={drink.drink_id} 
                to={`/drink/${drink.name}/${drink.drink_id}`}>
                    {drink.name}, {drink.stars} stars
                </NavLink>
    */

    return(
        <div>
            <h2>Drinks page</h2>
            <SearchInput />
            <p>sort by:</p>
            <select>
                <option>something</option>
                <option>something else</option>
            </select>
            <div className="drinks">
                {drinks.map((drink) => 
                    <DrinkLink key={drink.drink_id} drink={drink}/>)}
            </div>
            
        </div>
    )
}

export default Drinks