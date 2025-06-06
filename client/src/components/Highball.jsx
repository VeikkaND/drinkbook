function Highball({color, glassColor, size}) {
    //width="6.3000002mm"
    //height="17.974445mm"
    //style="fill:#e6e6e6;stroke-width:0.264583"
    //style="fill:#FF0000;stroke-width:0.26"
    //const glassColor = "#d6d6d6"

    //change sizeScale if necessary
    let sizeScale = 1
    if(size) {
        sizeScale = 0.4
    }

    return(
        <svg
            width={`${35*sizeScale}mm`}
            height={`${100*sizeScale}mm`}
            viewBox="0 0 6.3000002 17.974445"
            version="1.1"
            id="svg1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:svg="http://www.w3.org/2000/svg">
            <defs
                id="defs1" />
            <g
                id="layer1"
                transform="translate(-103.71667,-76.2)">
            <path
            id="glass"
            strokeWidth={0}
            fill={glassColor}
            d="m 103.75667,76.2 c -0.02,0 -0.04,0.03 -0.04,0.07 V 94.1 c 0,0.04 0.02,0.07 0.04,0.07 h 0.18 c 0,0 0,0 0.01,0 0,0 0,0 0,0 h 5.83 c 0.01,0.01 0.01,0 0.02,0 h 0.18 c 0.02,0 0.04,-0.03 0.04,-0.07 V 76.29 c 0,-0.04 -0.02,-0.07 -0.04,-0.07 h -0.18 c -0.02,0 -0.04,0.03 -0.04,0.07 v 16.99 c 0,0.01 0,0.01 0,0.02 0,0.13 -0.11,0.16 -0.15,0.17 h -5.5 c -0.04,-0.01 -0.11,-0.04 -0.13,-0.11 V 76.28 c 0,-0.04 -0.02,-0.07 -0.04,-0.07 z" />
            <path id="drink" 
            fill={color}
            strokeWidth={0}
            d="m 104.15, 76.2 V 93.25 h 5.42 v -17"
            />
            </g>
        </svg>
    )
}

export default Highball