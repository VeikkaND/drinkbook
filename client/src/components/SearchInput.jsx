import { useNavigate } from "react-router"
import { useEffect, useState } from "react"
import drinkService from "../services/drink"
import { useRef } from "react"

function SearchInput() {
    const [drinkNames, setDrinkNames] = useState([])
    const [matchingNames, setMatchingNames] = useState([])
    const [input, setInput] = useState("")
    const [suggestionShowing, setSuggestionShowing] = useState(false)
    const inputRef = useRef(null)
    useEffect(() => {
        //fetch all drink names
        const getNames = async () => {
            const names = await drinkService.getAllDrinkNames()
            setDrinkNames(names)
        }
        getNames()
    }, [])  
    const navigate = useNavigate()

    const handleSearch = () => {
        navigate("/search")
    }

    const handleChange = (event) => {
        const inputValue = event.target.value
        setInput(inputValue)
        //show suggestions only when input length > 2
        if(inputValue.length > 2) { 
            setSuggestionShowing(true)
        } else {
            setSuggestionShowing(false)
        }
        const matching = drinkNames.filter((name) => {
            return name.toLowerCase()
                .includes(inputValue.toLowerCase())
        })
        setMatchingNames(matching)
    }

    const handleClick = (event) => {
        setInput(event.target.innerText)
        setSuggestionShowing(false)
        inputRef.current.focus()
    }

    return(
        <div className="search-input">
            <form onSubmit={handleSearch}>
                <h3>Search for a drink:</h3>
                <input placeholder="vodka martini" 
                    name="input" autoComplete="off" 
                    onChange={handleChange} 
                    value={input} ref={inputRef}></input>
                {suggestionShowing && 
                <div className="input-suggestions">
                    {matchingNames.map((match, i) => 
                        <p key={i} onClick={handleClick}>{match}</p>
                    )}
                </div>}
                
            </form>
        </div>
    )
}

export default SearchInput