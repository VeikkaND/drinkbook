function Steps({text}) {
    console.log(text)
    const steps = text.split("|") //create array of steps
    return(
        <div>
            {steps.map((step, i) => 
            <p key={i}>{step}</p>)}
        </div>
    )
}

export default Steps