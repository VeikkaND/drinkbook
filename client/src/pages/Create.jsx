import { useState } from "react"
import drinkService from "../services/drink"
import ingredientService from "../services/ingredient"
import { HexColorPicker } from "react-colorful"
import Glass from "../components/Glass"
import { useEffect } from "react"
import { useNavigate } from "react-router"

function Create() {
    const [ingredientList, setIngredientList] = useState([
        {amount: "", unit: "", name: ""}])
    const [stepList, setStepList] = useState([
        {text: ""}
    ])
    const [name, setName] = useState(null)
    const [color, setColor] = useState("#aabbcc")
    const [glass, setGlass] = useState("highball")
    const [ingredients, setIngredients] = useState([])
    const [matchingIngredients, setMatchingIngredients] = useState([])
    const [suggestionShowing, setSuggestionShowing] = useState(false)
    const [suggestionIndex, setSuggestionIndex] = useState(0)
    const token = localStorage.getItem("token")
    const email = localStorage.getItem("email")
    const user_name = localStorage.getItem("user_name")

    useEffect(() => {
        const getIngredients = async () => {
            const names = await ingredientService
                .getAllIngredientNames()
            setIngredients(names)
        }
        getIngredients()
    }, [])

    const navigate = useNavigate()

    //create drink event
    const handleCreate = async (event) => {
        event.preventDefault()
        //change strings in units to numbers
        //maybe unnecessary???
        ingredientList.forEach((ingredient) => {
            ingredient.amount = Number(ingredient.amount)
        })

        //add steps to one string
        let steps = ""
        for (let i = 0; i < stepList.length; i++) {
            const text = stepList[i].text;
            steps = steps.concat(`${i+1}. ` + text + "|") // use | as separator 
        }
        
        const newId = await drinkService.createDrink(
            name, 
            ingredientList,
            steps,
            color,
            glass,
            token,
            {email: email, user_name: user_name}
        )
        //forward user to new drink page
        navigate(`/drink/${name}/${newId}`)
    }

    const handleNameChange = async (event) => {
        event.preventDefault()
        setName(event.target.value)
    }

    //add ingredient event
    const handleAdd = (event) => {
        event.preventDefault()
        setSuggestionShowing(false)
        if(ingredientList.length < 20) { // limit ingredients to 20
            setIngredientList([...ingredientList, 
                {amount: "", unit: "", name: ""}])
        } 
    }

    // remove ingredient event
    const handleRemove = (event, i) => {
        event.preventDefault()
        setSuggestionShowing(false)
        if(ingredientList.length > 1) { // only remove if > 1 left
            const newList = [...ingredientList]
            newList.splice(i, 1) 
            setIngredientList(newList)
        }
    }

    //change ingredient event
    const handleChange = (event, i) => {
        //update state with changed values
        const list = [...ingredientList]
        list[i][event.target.name] = event.target.value
        setIngredientList(list)

        //set suggestions
        if(event.target.name === "name") {
            //set index of field(row) to show suggestions for
            setSuggestionIndex(i) 
            const inputValue = event.target.value
            //show suggestions only when input length > 1
            if(inputValue.length > 1) { 
                setSuggestionShowing(true)
            } else {
                setSuggestionShowing(false)
            }
            const matching = ingredients.filter((name) => {
                return name.toLowerCase()
                    .includes(inputValue.toLowerCase())
            })
            setMatchingIngredients(matching)
        }
        
    }

    //add step event
    const handleStepAdd = (event, i) => {
        event.preventDefault()
        if(stepList.length < 20) { // limit steps to 20
            setStepList([...stepList, {text: ""}])
        }
    }

    //remove step event
    const handleStepRemove = (event, i) => {
        event.preventDefault()
        if(stepList.length > 1) {// only remove if > 1 left
            const newList = [...stepList]
            newList.splice(i, 1)
            setStepList(newList)
        }
    }

    //change step event
    const handleStepChange = (event, i) => {
        const list = [...stepList]
        list[i][event.target.name] = event.target.value
        setStepList(list)
    }
    
    //change color event
    const changeColor = (color) => {
        setColor(color)
    }

    //change glass event
    const changeGlass = (event) => {
        setGlass(event.target.value)
    }

    //suggestions click event
    const handleClick = (event, ingredient) => {
        ingredient.name = event.target.innerText
        setSuggestionShowing(false)
    }

    //TODO make fields mandatory etc.
    //fix bugs with suggestions
    return(
        <div className="create-main">
            <h1>Create a Drink</h1>
            <form onSubmit={handleCreate}>
                <h3>Name:</h3>
                <input name="name" 
                placeholder="Old Fashioned"
                onChange={handleNameChange}
                id="drink-name-input"></input>
                <div className="create-container">
                    <div className="create-row1">
                        <div className="glass">
                            <Glass glass={glass} color={color}/>
                        </div>
                        <div className="glass-options">
                            <select name="glass" onChange={changeGlass}>
                                <option value="highball">Highball</option>
                                <option value="cocktail">Cocktail</option>
                                <option value="lowball">Lowball</option>
                                <option value="champagne">Champagne</option>
                            </select>
                            <HexColorPicker color={color} 
                            onChange={changeColor}/>
                        </div>
                    </div>
                    <div className="create-row2">
                        <div className="create-ingredients">
                            <h3>Ingredients</h3>
                            <p id="note">(Amount, unit, name)</p>
                            {ingredientList.map((ingredient, i) => {
                                return(
                                    <div key={i} className="ingredient-row">
                                        <div className="ingredient-row-inputs">
                                            <input name="amount" 
                                            value={ingredient.amount}
                                            placeholder="1" 
                                            onChange={(e) => handleChange(e, i)}
                                            id="amount-input"
                                            type="number"
                                            autoComplete="off"/>
                                            <input name="unit" 
                                            value={ingredient.unit}
                                            placeholder="cl"
                                            onChange={(e) => handleChange(e, i)}
                                            id="unit-input"
                                            autoComplete="off"/>
                                            <div className="name-input-container">
                                                <input name="name" 
                                                value={ingredient.name}
                                                placeholder="vodka"
                                                onChange={(e) => handleChange(e, i)}
                                                id="name-input"
                                                autoComplete="off"/>
                                                {(suggestionShowing && suggestionIndex === i) &&
                                                <div className="input-suggestions">
                                                    {matchingIngredients.map((match, i) => 
                                                    <p key={i} onClick={(e) => handleClick(e, ingredient)}>{match}</p>)}
                                                </div>}
                                            </div>
                                        </div>
                                        <button onClick={(e) => 
                                            handleRemove(e, i)}>Remove</button>
                                    </div>
                                )          
                            })}
                            <div>
                                <button onClick={handleAdd}>Add Ingredient</button>
                            </div>
                        </div>
                        <div className="create-steps">
                            <h3>Steps</h3>
                            {stepList.map((step, i) => {
                                return(
                                    <div key={i} className="step-row">
                                        <div className="step-row-input">
                                            <p>{i+1 + "."}</p>
                                            <textarea name="text"
                                            value={step.text}
                                            placeholder="do something"
                                            onChange={(e) => handleStepChange(e, i) }
                                            rows={3}/>
                                        </div>
                                        <button onClick={(e) => 
                                            handleStepRemove(e, i)}>Remove Step</button>
                                    </div>
                                )
                            })}
                            <button onClick={handleStepAdd}
                            id="add-step">
                                Add Step
                            </button>
                        </div>
                    </div>
                </div>
                <button type="submit" id="create-button">
                    Create
                </button>
            </form>
        </div>
    )
}

export default Create