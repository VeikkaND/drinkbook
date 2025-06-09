import { useEffect } from "react"
import { useState } from "react"
import drinkService from "../services/drink"
import { useParams } from "react-router"
import { IngredientList } from "../components/IngredientList"
import Glass from "../components/Glass"
import Steps from "../components/Steps"

function Drink() {
    const [drink, setDrink] = useState(null)
    const [stars, setStars] = useState(0)
    const params = useParams()
    useEffect(() => {
        const getDrink = async () => {
            const name = params.name
            const id = params.id
            const res = await drinkService.getDrinkById(name, id)
            setDrink(res)
            setStars(res.drink.stars)
        }
        getDrink()
    }, [])

    //TODO make stars only available to users & add removing stars
    const handleStar = async () => {
        const res = await drinkService
            .starDrink(drink.drink.drink_id)
        setStars(stars+1)
    }

    //TODO add other recipes for the same drink and recommendations
    return(
        <div>
            <div>
                <h3>{drink ? drink.drink.name : "Drink"}</h3>

                <p>{stars} stars</p>

                {drink ? <Glass glass={drink.drink.glass} 
                    color={drink.drink.color}/> 
                : <p>loading image</p>}
                
                <button onClick={handleStar}>star</button>

                {drink ? <IngredientList drink={drink}/> 
                : <p>loading ingredients</p>}

                {drink ? <Steps text={drink.drink.steps}/> 
                : <p>loading steps</p>}
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