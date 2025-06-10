import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router"
import drinkService from "../services/drink"
import DrinkLink from "../components/DrinkLink"

function Ingredient() {
    const [drinks, setDrinks] = useState([])
    const params = useParams()
    const ingredientName = params.name
    useEffect(() => {
        //TODO find all drinks with ingredient
        const getDrinks = async () => {
            const res = await drinkService
                .getDrinksWithIngredient(ingredientName)
            setDrinks(res)
        }
        getDrinks()
    }, [])

    return(
        <div>
            <h3>{ingredientName}</h3>
            <p>Drinks with {ingredientName}:</p>
            <div className="drinks">
                {drinks &&
                drinks.map((drink, i) => 
                    <DrinkLink drink={drink} key={i}/>)}
            </div>
        </div>
    )
}

export default Ingredient