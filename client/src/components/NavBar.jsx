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
                    }}
                    id="sign-out-button">
                        Log out
                        <img src={"sign-out.svg"}></img>
                    </button>
        )
    }

    const closeProfile = () => {
        setProfileMenu(false)
    }

    return(
        <div className="navbar">
            <NavLink to="/" id="main" 
            onClick={closeProfile}>Home</NavLink>
            <NavLink to="/drinks" id="main" 
            onClick={closeProfile}>Drinks</NavLink>
            <NavLink to="/create" id="main" 
            onClick={closeProfile}>Create</NavLink>
            
            {user_id ?
            <div className="profile-container">
                <button onClick={() => {
                    setProfileMenu(!profileMenu)
                }}
                id="logged-in-button"
                className={profileMenu ? "opened" : "normal"}>
                    <p>{username}</p>
                    <img src={"bars.svg"} 
                    id={profileMenu ? "opened" : "normal"}></img>
                </button>
                <div className="profile-menu" style={{
                    display: profileMenu ? "flex" : "none"
                }} id={profileMenu ? "opened" : "normal"}>
                    <Link to={`/profile/${user_id}`} 
                        onClick={() => setProfileMenu(false)}>
                        Profile
                        <img src={"profile.svg"}></img>
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