import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router"


function Ingredient() {
    const [drinks, setDrinks] = useState([])
    const params = useParams
    const ingredientName = params.name
    useEffect(() => {
        //TODO find all drinks with ingredient
    }, [])

    return(
        <div>
            <h3>{ingredientName}</h3>
            <p>list drinks with ingredient here</p>
        </div>
    )
}

export default Ingredient