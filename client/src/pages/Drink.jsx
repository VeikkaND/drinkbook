import { useEffect } from "react"
import { useState } from "react"
import drinkService from "../services/drink"
import { useParams } from "react-router"

function Drink() {
    const [drink, setDrink] = useState(null)
    const params = useParams()
    useEffect(() => {
        const getDrink = async () => {
            const name = params.name
            const id = params.id
            const res = await drinkService.getDrinkById(name, id)
            console.log(res)
            setDrink(res)
        }
        getDrink()
    }, [])

    return(
        <div>
            <h3>{drink && drink.drink.name}</h3>
            <p>some more text here about ingredients</p>
        </div>
    )
}

export default Drink