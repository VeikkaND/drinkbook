export const IngredientList = ({drink}) => {
    return(
        <div>
            {drink.ingredients.map((ingredient) => 
            <li key={ingredient.name}>{ingredient.amount}
            {" "}{ingredient.unit}
            &nbsp; {ingredient.name}</li>)}
        </div>
    )
}