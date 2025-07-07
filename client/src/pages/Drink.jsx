import { useEffect } from "react"
import { useState } from "react"
import drinkService from "../services/drink"
import userService from "../services/user"
import { useParams } from "react-router"
import { IngredientList } from "../components/IngredientList"
import Glass from "../components/Glass"
import Steps from "../components/Steps"
import DrinkLink from "../components/DrinkLink"
import  Star from "../../public/star.svg?react"

function Drink() {
    const [drink, setDrink] = useState(null)
    const [stars, setStars] = useState(0)
    const [starred, setStarred] = useState(false)
    const [other, setOther] = useState([])
    const params = useParams()
    const name = params.name
    const id = params.id
    const token = localStorage.getItem("token")
    const user_id = localStorage.getItem("user_id")
    const user_name = localStorage.getItem("user_name")
    const email = localStorage.getItem("email")

    useEffect(() => {
        const getDrink = async () => {
            const res = await drinkService.getDrinkById(name, id)
            setDrink(res)
            setStars(res.drink.stars)
            if(email) {
                const stars = await userService.getStarred(email)
                const found = stars.find((d) => d.drink_id == id)
                if(found) setStarred(true)
            }
        }
        const getOtherDrinks = async () => {
            const res = await drinkService
                .getDrinksWithSameName(name)
            const others = res.filter((d) => d.drink_id != id)
            setOther(others)
        }
        getDrink()
        getOtherDrinks()
    }, [id])

    const handleStar = async () => {
        const user = {
            name: user_name,
            email: email
        }
        const res = await drinkService
            .starDrink(drink.drink.drink_id, token, user)
        if(res == "add") {
            setStars(stars+1)
            setStarred(true)
        } else {
            setStars(stars-1)
            setStarred(false)
        }
        
    }

    const StepsContainer = () => {
        return(
            <div>
                {drink.drink.steps != "1. |" &&
                    <div>
                        <h3>Steps</h3>
                        <Steps text={drink.drink.steps}/> 
                    </div>
                }
            </div>
        )
    }

    return(
        <div className="drink">
            <h1>{name}</h1>
            <div className="drink-main">
                <div className="drink-row1">
                    {drink ? <Glass glass={drink.drink.glass} 
                        color={drink.drink.color}/> 
                    : <p>loading image</p>}
                </div>
                <div className="drink-row2">
                    <h2>{name}</h2>
                    <div className="stars">
                        <p>{stars} stars</p>
                        {token && 
                        <button onClick={handleStar}>
                            <Star className={starred ? "star-on" : "star-default"}/>
                        </button>}
                    </div>
                    
                    <h3>Ingredients</h3>
                    {drink ? <IngredientList drink={drink}/> 
                    : <p>loading ingredients</p>}

                    {drink && <StepsContainer />}
                </div>
            </div>
            {other.length > 0 && 
            <div className="others">
                <h4>other recipes</h4>
                {other &&
                <div className="drinks">
                    {other.map((d, i) => 
                        <DrinkLink drink={d} key={i} 
                        other={true}/>
                    )}
                </div>
                }
            </div>
            }
        </div>
    )
}

export default Drink