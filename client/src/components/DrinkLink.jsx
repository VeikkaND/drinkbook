import { useNavigate } from "react-router"
import Glass from "./Glass"

function DrinkLink({drink, other}) {
    const navigate = useNavigate()
    const ingredients = drink.ingredients

    const handleClick = () => {
        navigate(`/drink/${drink.name}/${drink.drink_id}`)
    }

    if(other) {
        return(
            <div className="drinklink" onClick={handleClick}>
                <div className="drinklink-container">
                    <Glass color={drink.color} glass={drink.glass} size="small"/>
                    <h3>{drink.name}</h3>
                    {ingredients && 
                        <div>
                            {ingredients.map((ing, i) => 
                            <p key={i}>{ing.amount}{" "}{ing.unit} &nbsp; {ing.name}</p>)}
                        </div>
                    }
                    <p>{drink.stars + " "} stars</p>
                </div>
            </div>
        )
    } else {
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
    
}

export default DrinkLink