import { useEffect } from "react"
import { useState } from "react"
import { useSearchParams } from "react-router"
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

    return(
        <div>
            <p>search results for {searchParams.get("input")}</p>
            {drinks.map((drink) => 
                <p key={drink.drink_id}>{drink.name}, stars: {drink.stars}</p>)}
        </div>
    )
}

export default Search