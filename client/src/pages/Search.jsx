import { useEffect } from "react"
import { useState } from "react"
import { useSearchParams, NavLink } from "react-router"
import drinkService from "../services/drink"

function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [drinks, setDrinks] = useState([])
    useEffect(() => {
        const getDrinks = async () => {
            const res = await drinkService
                .getDrinksByInput(searchParams.get("input"))
            setDrinks(res)
        }
        getDrinks()
    }, [])

    // TODO change search result drinks to different view
    return(
        <div>
            <p>search results for {searchParams.get("input")}</p>
            {drinks.map((drink) => 
                <NavLink key={drink.drink_id} 
                to={`/drink/${drink.name}/${drink.drink_id}`}>
                    {drink.name}, {drink.stars} stars
                </NavLink>)}
        </div>
    )
}

export default Search