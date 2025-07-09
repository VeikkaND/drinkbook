import { useNavigate } from "react-router"
import userService from "../services/user"

function Register() {
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const name = e.target.username.value
        const email = e.target.email.value
        const password = e.target.password.value

        const res = await userService
            .registerUser(name, email, password)
        if(res) {
            localStorage.setItem("token", res.token)
            localStorage.setItem("user_name", res.user_name)
            localStorage.setItem("user_id", res.user_d)
            localStorage.setItem("email", res.email)
            navigate("/")
        }
        
    }

    return(
        <div className="content">
            <h2>Register</h2>
            <form id="register-form" onSubmit={handleSubmit}>
                <p>username:</p>
                <input name="username"
                autoComplete="off"/>

                <p>email:</p>
                <input name="email"
                autoComplete="off"/>

                <p>password:</p>
                <input name="password"
                autoComplete="off"/>

                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register