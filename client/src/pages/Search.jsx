import { useEffect } from "react"
import { useState } from "react"
import { useSearchParams, NavLink } from "react-router"
import drinkService from "../services/drink"
import DrinkLink from "../components/DrinkLink"

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
            <div className="drinks">
                {drinks.map((drink, i) => 
                    <DrinkLink drink={drink} key={i}/>
                )}
            </div>
            
        </div>
    )
}

export default Search