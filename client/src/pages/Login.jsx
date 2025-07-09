import { Link, useNavigate } from "react-router"
import userService from "../services/user"

function Login() {
    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const name = e.target.username.value
        const password = e.target.password.value

        const res = await userService.loginUser(name, password)
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
            <h2>Login</h2>
            <form id="login-form" onSubmit={handleSubmit}>
                <p>username:</p>
                <input name="username"
                autoComplete="off"/>
                <p>password:</p>
                <input name="password"
                autoComplete="off"/>
                <button type="submit">Login</button>
            </form>
            <div className="register-here-box">
                <p>don't have an account?</p>
                <Link to={"/register"}>register here</Link>
            </div>
        </div>
    )
}

export default Login