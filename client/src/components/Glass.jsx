import Highball from "./Highball"
import Cocktail from "./Cocktail"
import Champagne from "./Champagne"
import Lowball from "./Lowball"

function Glass({glass, color, size}) {
    const glassColor = "#d6d6d6"

    switch(glass) {
            case "highball":
                return <Highball color={color} 
                glassColor={glassColor} size={size}/>
            case "cocktail":
                return <Cocktail color={color}
                glassColor={glassColor} size={size}/>
            case "champagne":
                return <Champagne color={color}
                glassColor={glassColor} size={size}/>
            case "lowball":
                return <Lowball color={color}
                glassColor={glassColor} size={size}/>
        }
}

export default Glass