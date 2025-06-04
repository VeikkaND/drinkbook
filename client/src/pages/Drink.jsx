import { useEffect } from "react"
import { useState } from "react"
import drinkService from "../services/drink"
import { useParams } from "react-router"
import { IngredientList } from "../components/IngredientList"

function Drink() {
    const [drink, setDrink] = useState(null)
    const params = useParams()
    useEffect(() => {
        const getDrink = async () => {
            const name = params.name
            const id = params.id
            const res = await drinkService.getDrinkById(name, id)
            setDrink(res)
        }
        getDrink()
    }, [])

    

    //TODO add stars & steps, other recipes for the same drink,
    //and recommendations
    return(
        <div>
            <div>
                <h3>{drink ? drink.drink.name : "Drink"}</h3>
                {drink ? <IngredientList drink={drink}/> 
                : <p>loading ingredients</p>}
                <p>some more text here about the drink</p>
            </div>
            <div>
                <h4>other recipes</h4>
                <p>other recipes for the same drink here</p>
            </div>
            <div>
                <h4>recommendations</h4>
                <p>other drinks here</p>
            </div>
        </div>
    )
}

export default Drink