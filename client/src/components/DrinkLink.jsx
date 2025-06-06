import { useNavigate } from "react-router"
import Glass from "./Glass"

function DrinkLink({drink}) {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/drink/${drink.name}/${drink.drink_id}`)
    }

    return(
        <div className="drinklink" onClick={handleClick}>
            <div className="drinklink-container">
                <Glass color={drink.color} glass={drink.glass} size="small"/>
                <h3>{drink.name}</h3>
                <p>{drink.stars + " "} stars</p>
            </div>
        </div>
    )
}

export default DrinkLink