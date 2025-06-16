import { useEffect, useState } from "react"
import { useParams } from "react-router"
import userService from "../services/user"
import DrinkLink from "../components/DrinkLink"

function Profile() {
    const [user, setUser] = useState(null)
    const [created, setCreated] = useState([])
    const [starred, setStarred] = useState([])
    const params = useParams()
    const userId = params.id
    const email = localStorage.getItem("email")
    const token = localStorage.getItem("token")
    useEffect(() => {
        const getUser = async () => {
            const u = await userService.getUser(token, email)
            if(u.starred_drinks.length > 0) {
                const s = await userService.getStarred(email)
                setStarred(s)
            }
            if(u.created_drinks.length > 0) {
                const c = await userService.getCreated(email)
                setCreated(c)
            }
            setUser(u)
            
        }
        getUser()
    }, [])

    return(
        <div>
            {user ?
            <div>
                <h1>{user.user_name}</h1>
                <p>Starred drinks: {user.starred_drinks.length}</p>
                <p>Created drinks: {user.created_drinks.length}</p>

                <h2>Starred Drinks</h2>
                <div className="drinks">
                    {starred &&
                        starred.map((drink, i) => 
                            <DrinkLink drink={drink} key={i}/>)
                    }
                </div>
                
                <h2>Created Drinks</h2>
                <div className="drinks">
                    {created &&
                        created.map((drink, i) => 
                            <DrinkLink drink={drink} key={i}/>)
                    }
                </div>
            </div>
            :
            <div>
                <p>Loading user...</p>
            </div>
            }
        </div>
    )
}

export default Profile