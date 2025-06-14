import { NavLink, useNavigate } from "react-router"
import { useGoogleLogin } from "@react-oauth/google"
import { googleLogout } from "@react-oauth/google"
import axios from "axios"

function NavBar() {
    const navigate = useNavigate()
    const user_id = localStorage.getItem("user_id")
    
    const login = useGoogleLogin({
        flow: "auth-code",
        onSuccess: async (codeResponse) => {
            const tokens = await axios.get('/api/google/callback', {
                params: {code: codeResponse.code}
            })
            console.log("tokens:", tokens.data)
            //store token & user details in localstorage
            localStorage.setItem("token", tokens.data.token)
            localStorage.setItem("user_id", tokens.data.user.user_id)
            localStorage.setItem("user_name", tokens.data.user.user_name)
            localStorage.setItem("email", tokens.data.user.email)
            window.location.reload()
        },
        onError: (error) => console.log(error)
    })

    return(
        <div className="navbar">
            <NavLink to="/">logo here</NavLink>
            <NavLink to="/drinks">Drinks</NavLink>
            <NavLink to="/create">Create</NavLink>
            {user_id ?
            <div>
                <button onClick={() => {
                    googleLogout()
                    localStorage.clear()
                    navigate("/")
                    }}>sign out</button>
            </div> :
            <div>
                <button onClick={login}>sign in (google)</button>
            </div> 
            }
            
        </div>
    )
}

export default NavBar