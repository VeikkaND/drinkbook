import { Link, NavLink, useNavigate } from "react-router"
import { useState } from "react"
import Bars from "../../public/bars.svg?react"
import Profile from "../../public/profile.svg?react"
import SignOut from "../../public/sign-out.svg?react"

function NavBar() {
    const [profileMenu, setProfileMenu] = useState(false)
    const navigate = useNavigate()
    const user_id = localStorage.getItem("user_id")
    const username = localStorage.getItem("user_name")

    const SignoutButton = () => {
        return(
            <button onClick={() => {
                    localStorage.clear()
                    navigate("/")
                    }}
                    id="sign-out-button">
                        Log out
                        <SignOut />
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
                    <Bars 
                        id={profileMenu ? "opened" : "normal"}> 
                    </Bars>
                </button>
                <div className="profile-menu" style={{
                    display: profileMenu ? "flex" : "none"
                }} id={profileMenu ? "opened" : "normal"}>
                    <Link to={`/profile/${user_id}`} 
                        onClick={() => setProfileMenu(false)}>
                        Profile
                        <Profile />
                    </Link>
                    <SignoutButton />
                </div>
            </div> :
            <NavLink to="/login" id="main" 
            onClick={closeProfile}>Login</NavLink>
            }
            
        </div>
    )
}

export default NavBar