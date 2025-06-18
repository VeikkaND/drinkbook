function Steps({text}) {
    if(text) {
        const steps = text.split("|") //create array of steps
        return(
            <div className="steps">
                {steps.map((step, i) => 
                <p key={i}>{step}</p>)}
            </div>
    )
    }
    
}

export default Steps