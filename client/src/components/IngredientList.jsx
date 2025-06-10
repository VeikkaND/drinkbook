import { useNavigate } from "react-router"

export const IngredientList = ({drink}) => {
    const navigate = useNavigate()

    const handleClick = (name) => {
        navigate(`/ingredient/${name}`)
    }

    return(
        <div>
            {drink.ingredients.map((ingredient, i) => 
            <li key={i} onClick={() => 
                handleClick(ingredient.name)}>
                    {ingredient.amount}{" "}{ingredient.unit}
            &nbsp; {ingredient.name}</li>)}
        </div>
    )
}