import Highball from "./Highball"
import Cocktail from "./Cocktail"

function Glass({glass, color}) {
    const glassColor = "#d6d6d6"

    switch(glass) {
            case "highball":
                return <Highball color={color} 
                glassColor={glassColor}/>
            case "cocktail":
                return <Cocktail color={color}
                glassColor={glassColor}/>
        }
}

export default Glass