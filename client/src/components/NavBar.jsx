import { Link, NavLink, useNavigate } from "react-router"
import { useGoogleLogin } from "@react-oauth/google"
import { googleLogout } from "@react-oauth/google"
import axios from "axios"
import { useState } from "react"

function NavBar() {
    const [profileMenu, setProfileMenu] = useState(false)
    const navigate = useNavigate()
    const user_id = localStorage.getItem("user_id")
    const username = localStorage.getItem("user_name")
    
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

    const SignoutButton = () => {
        return(
            <button onClick={() => {
                    googleLogout()
                    localStorage.clear()
                    navigate("/")
                    }}>
                        sign out</button>
        )
    }

    return(
        <div className="navbar">
            <NavLink to="/">Drinkbook</NavLink>
            <NavLink to="/drinks">Drinks</NavLink>
            <NavLink to="/create">Create</NavLink>
            
            {user_id ?
            <div className="profile-container">
                <button onClick={() => {
                    setProfileMenu(!profileMenu)
                }}>Logged in as {username}</button>
                <div className="profile-menu" style={{
                    display: profileMenu ? "flex" : "none"
                }}>
                    <Link to={`/profile/${user_id}`} 
                        onClick={() => setProfileMenu(false)}>
                        Profile
                    </Link>
                    <SignoutButton />
                </div>
            </div> :
            <div>
                <button onClick={login} id="sign-in">
                    <img src="web_light_sq_SI.svg"></img>
                </button>
            </div> 
            }
            
        </div>
    )
}

export default NavBar