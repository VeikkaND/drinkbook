import { useEffect } from "react"
import { useState } from "react"
import { useSearchParams } from "react-router"
import drinkService from "../services/drink"
import DrinkLink from "../components/DrinkLink"

function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [drinks, setDrinks] = useState([])
    useEffect(() => {
        const input = searchParams.get("input")
        if(input) {
            const getDrinks = async () => {
                const res = await drinkService
                    .getDrinksByInput(searchParams.get("input"))
                setDrinks(res)
            }
            getDrinks()
        }
        
    }, [])

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