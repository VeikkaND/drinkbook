import { useNavigate } from "react-router"

export const IngredientList = ({drink}) => {
    const navigate = useNavigate()

    const handleClick = (name) => {
        navigate(`/ingredient/${name}`)
    }

    return(
        <div className="ingredients">
            {drink.ingredients.map((ingredient, i) => 
            <li key={i} >
                <p id="ingredient-name" onClick={() => 
                handleClick(ingredient.name)}>
                    {ingredient.name}
                </p>  
                <p id="ingredient-amount">
                {ingredient.amount}{" "}{ingredient.unit}
                </p>
                     
            </li>)}
        </div>
    )
}