import { useState } from "react"
import drinkService from "../services/drink"
import Highball from "../components/Highball"
import { HexColorPicker } from "react-colorful"
import Cocktail from "../components/Cocktail"

function Create() {
    const [ingredientList, setIngredientList] = useState([
        {amount: "", unit: "", name: ""}])
    const [stepList, setStepList] = useState([
        {text: ""}
    ])
    const [name, setName] = useState(null)
    const [color, setColor] = useState("#aabbcc")
    const [glass, setGlass] = useState("highball")

    const handleCreate = async (event) => {
        console.log("creating new drink")
        // change strings in units to numbers
        ingredientList.forEach((ingredient) => {
            ingredient.amount = Number(ingredient.amount)
        })

        //add steps to one string
        let steps = ""
        for (let i = 0; i < stepList.length; i++) {
            const text = stepList[i].text;
            steps = steps.concat(`${i}. ` + text + "|") // use | as separator 
        }
        
        const newId = await drinkService.createDrink(
            name, 
            ingredientList,
            steps,
            color,
            glass
        )
    }

    const handleNameChange = async (event) => {
        event.preventDefault()
        setName(event.target.value)
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
        //check if amount is a number
        if(event.target.name === "amount" && !Number(event.target.value)) {
            console.log("must be a number")
            //TODO inform user
            return
        }
        const list = [...ingredientList]
        list[i][event.target.name] = event.target.value
        setIngredientList(list)
    }

    const handleStepAdd = (event, i) => {
        event.preventDefault()
        if(stepList.length < 20) { // limit steps to 20
            setStepList([...stepList, {text: ""}])
        }
    }

    const handleStepRemove = (event, i) => {
        event.preventDefault()
        if(stepList.length > 1) {// only remove if > 1 left
            const newList = [...stepList]
            newList.splice(i, 1)
            console.log(newList)
            setStepList(newList)
        }
    }

    const handleStepChange = (event, i) => {
        const list = [...stepList]
        list[i][event.target.name] = event.target.value
        setStepList(list)
    }
    
    const glassColor = "#d6d6d6"
    const changeColor = (color) => {
        setColor(color)
    }

    const changeGlass = (event) => {
        setGlass(event.target.value)
    }

    const glassType = () => {
        switch(glass) {
            case "highball":
                return <Highball color={color} 
                glassColor={glassColor}/>
            case "cocktail":
                return <Cocktail color={color}
                glassColor={glassColor}/>
        }
    }

    //TODO make fields mandatory etc.
    return(
        <div>
            <h2>Create page here</h2>
            <form onSubmit={handleCreate}>
                <input name="name" 
                placeholder="Old Fashioned"
                onChange={handleNameChange}></input>
                <div>
                    <p>Amount unit name</p>
                    {ingredientList.map((ingredient, i) => {
                        return(
                            <div key={i}>
                                <input name="amount" 
                                value={ingredient.amount}
                                placeholder="1" 
                                onChange={(e) => handleChange(e, i)}/>
                                <input name="unit" 
                                value={ingredient.unit}
                                placeholder="cl"
                                onChange={(e) => handleChange(e, i)}/>
                                <input name="name" 
                                value={ingredient.name}
                                placeholder="vodka"
                                onChange={(e) => handleChange(e, i)}/>
                                <button onClick={(e) => 
                                    handleRemove(e, i)}>Remove</button>
                            </div>
                        )          
                    })}
                    <div>
                        <button onClick={handleAdd}>Add</button>
                    </div>
                </div>
                <div>
                    <h3>Guide</h3>
                    {stepList.map((step, i) => {
                        return(
                            <div key={i}>
                                {i+1 + "."}
                                <textarea name="text"
                                value={step.text}
                                placeholder="do something"
                                onChange={(e) => handleStepChange(e, i) }/>
                                <button onClick={(e) => 
                                    handleStepRemove(e, i)}>Remove</button>
                            </div>
                        )
                    })}
                    <button onClick={handleStepAdd}>Add</button>
                </div>
                <div>
                    <select name="glass" onChange={changeGlass}>
                        <option value="highball">Highball</option>
                        <option value="cocktail">Cocktail</option>
                    </select>
                    {glassType()}
                    <HexColorPicker color={color} 
                    onChange={changeColor}/>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default Create