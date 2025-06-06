import Highball from "./Highball"
import Cocktail from "./Cocktail"

function Glass({glass, color, size}) {
    const glassColor = "#d6d6d6"

    switch(glass) {
            case "highball":
                return <Highball color={color} 
                glassColor={glassColor} size={size}/>
            case "cocktail":
                return <Cocktail color={color}
                glassColor={glassColor} size={size}/>
        }
}

export default Glass