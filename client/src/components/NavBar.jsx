import { NavLink, useNavigate } from "react-router"
import { useGoogleLogin } from "@react-oauth/google"
import { googleLogout } from "@react-oauth/google"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { resetUser, setUser } from "../reducers/userReducer"

function NavBar() {
    const [loggedIn, setLoggedIn] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const login = useGoogleLogin({
        flow: "auth-code",
        onSuccess: async (codeResponse) => {
            const tokens = await axios.get('/api/google/callback', {
                params: {code: codeResponse.code}
            })
            console.log("tokens:", tokens.data)
            //store user in redux store
            dispatch(setUser(tokens.data.user[0]))
            //store token in localstorage
            localStorage.setItem("token", tokens.data.token)
            setLoggedIn(true)
        },
        onError: (error) => console.log(error)
    })

    //TODO check if logged in, store in state/context
    return(
        <div className="navbar">
            <NavLink to="/">logo here</NavLink>
            <NavLink to="/drinks">Drinks</NavLink>
            <NavLink to="/create">Create</NavLink>
            {loggedIn ?
            <div>
                <button onClick={() => {
                    googleLogout()
                    localStorage.clear()
                    setLoggedIn(false)
                    navigate("/")
                    dispatch(resetUser())
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