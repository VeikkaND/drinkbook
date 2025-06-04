import { useEffect } from "react"
import drinkService from "../services/drink"
import { useState } from "react"
import { NavLink } from "react-router"

function Drinks() {
    const [drinks, setDrinks] = useState([])
    useEffect(() => {
        const getDrinks = async () => {
            const res = await drinkService.getAllDrinks()
            console.log(res)
            setDrinks(res)
        }
        getDrinks()
    }, [])

    return(
        <div>
            <h2>Drinks page</h2>
            {drinks.map((drink) => 
                <NavLink key={drink.drink_id} 
                to={`/drink/${drink.name}/${drink.drink_id}`}>
                    {drink.name}, {drink.stars} stars
                </NavLink>)}
        </div>
    )
}

export default Drinks