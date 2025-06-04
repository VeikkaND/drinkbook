import { useState } from "react"


function Create() {
    const [ingredientList, setIngredientList] = useState([
        {amount: "", unit: "", name: ""}])

    const handleCreate = async () => {

    }

    const handleAdd = (event) => {
        event.preventDefault()
        if(ingredientList.length < 20) { // limit ingredients to 20
            setIngredientList([...ingredientList, 
                {amount: "", unit: "", name: ""}])
        } 
    }

    // remove specified index
    const handleRemove = (event, i) => {
        event.preventDefault()
        if(ingredientList.length > 1) { // only remove if > 1 left
            const newList = [...ingredientList]
            newList.splice(i, 1) 
            setIngredientList(newList)
        }
    }

    const handleChange = (event, i) => {
        const list = [...ingredientList]
        list[i][event.target.name] = event.target.value
        setIngredientList(list)
    }

    return(
        <div>
            <h2>Create page here</h2>
            <form onSubmit={handleCreate}>
                {ingredientList.map((ingredient, i) => {
                    return(
                        <div key={i}>
                            <input name="amount" 
                            value={ingredient.amount} 
                            onChange={(e) => handleChange(e, i)}/>
                            <input name="unit" 
                            value={ingredient.unit}
                            onChange={(e) => handleChange(e, i)}/>
                            <input name="name" 
                            value={ingredient.name}
                            onChange={(e) => handleChange(e, i)}/>
                            <button onClick={(e) => handleRemove(e, i)}>Remove</button>
                        </div>
                    )          
                })}
                <div>
                    <button onClick={handleAdd}>Add</button>
                </div>
            </form>
        </div>
    )
}

export default Create