function  Lowball({color, glassColor, size}) {

    //change sizeScale if necessary
    let sizeScale = 1
    if(size) {
        sizeScale = 0.4
    }

    return(
        <svg
            width={`${35*sizeScale}mm`}
            height={`${100*sizeScale}mm`}
            viewBox="0 0 6.6533899 0.5"
            version="1.1"
            id="svg1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:svg="http://www.w3.org/2000/svg">
            <defs
                id="defs1" />
            <g
                id="layer1"
                transform="translate(-180.97503,-132.02708)">
                <path
                id="glass"
                fill={glassColor}
                strokeWidth={0}
                d="m 181.11608,132.02708 c -0.0779,0 -0.14056,0.0627 -0.14056,0.14056 v 7.94525 c 0,8.9e-4 5e-4,0.002 5.1e-4,0.003 -1.3e-4,0.001 -0.001,0.003 -0.001,0.004 v 0.59118 c 0,0.0269 0.0217,0.0486 0.0486,0.0486 h 6.55619 c 0.0269,0 0.0486,-0.0217 0.0486,-0.0486 v -0.59116 c 0,-0.001 -9e-4,-0.003 -0.001,-0.004 2e-5,-8.9e-4 5.2e-4,-0.002 5.2e-4,-0.003 v -7.94527 c 0,-0.0779 -0.0627,-0.14056 -0.14056,-0.14056 h -0.0909 c -0.0779,0 -0.14056,0.0627 -0.14056,0.14056 v 7.90339 h -5.90824 v -7.90339 c 0,-0.0779 -0.0627,-0.14056 -0.14056,-0.14056 z" />
                <path 
                id="drink"
                fill={color}
                strokeWidth={0}
                d="m 181.55,132.37 V 139.85 h 5.5 V 132.4"
                />
                
            </g>
        </svg>
    )
}

export default Lowball