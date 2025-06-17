import { useEffect } from "react"
import drinkService from "../services/drink"
import { useState } from "react"
import DrinkLink from "../components/DrinkLink"
import SearchInput from "../components/SearchInput"

function Drinks() {
    const [drinks, setDrinks] = useState([])
    const [sort, setSorting] = useState("stars")
    useEffect(() => {
        const getDrinks = async () => {
            const res = await drinkService.getAllDrinks()
            setDrinks(res)
            setSorting("stars")
            sortDrinks()
        }
        getDrinks()
    }, [])

    const handleChange = (event) => {
        const val = event.target.value
        switch(val) {
            case "stars":
                setSorting("stars")
                break
            case "alphabetical":
                setSorting("alphabetical")
                break
        }
    }

    const sortDrinks = () => {
        const array = drinks
        switch(sort) {
            case "stars":
                array.sort((a,b) => b.stars - a.stars)
                return array.map((drink) => 
                    <DrinkLink key={drink.drink_id} drink={drink}/>)
            case "alphabetical":
                array.sort((a,b) => {
                    const aName = a.name.toLowerCase()
                    const bName = b.name.toLowerCase()
                    if(aName < bName) {return -1}
                    if(aName > bName) {return 1}
                    return 0
                })
                return array.map((drink) => 
                    <DrinkLink key={drink.drink_id} drink={drink}/>)
        }
    }

    return(
        <div className="content">
            <div className="main">
                <SearchInput />
            </div>
            <div className="secondary">
                <h2>Browse all drinks</h2>
                <label>
                    sort by: &nbsp;
                    <select onChange={handleChange}>
                        <option value={"stars"}>
                            stars</option>
                        <option value={"alphabetical"}>
                            alphabetical</option>
                    </select>
                </label>
                
                <div className="drinks">
                    {sortDrinks()}
                </div>
            </div>
            
            
        </div>
    )
}

export default Drinks