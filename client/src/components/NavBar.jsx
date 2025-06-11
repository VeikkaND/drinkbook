import { NavLink } from "react-router"
import { useGoogleLogin } from "@react-oauth/google"
import axios from "axios"

function NavBar() {
    
    const login = useGoogleLogin({
        flow: "auth-code",
        onSuccess: async (codeResponse) => {
            console.log("codeResponse: ", codeResponse)
            const tokens = await axios.get('/api/google/callback', {
                params: {code: codeResponse.code}
            })
            console.log("tokens:", tokens.data)
            //TODO store token somewhere
        },
        onError: (error) => console.log(error)
    })

    //TODO check if logged in, store in state/context
    return(
        <div className="navbar">
            <NavLink to="/">logo here</NavLink>
            <NavLink to="/drinks">Drinks</NavLink>
            <NavLink to="/create">Create</NavLink>
            <div>
                <button onClick={login}>sign in (google)</button>
            </div>
        </div>
    )
}

export default NavBar