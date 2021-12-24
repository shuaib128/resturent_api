import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { BackendLink } from '../Api/BackendLink';
import jwt_decode from "jwt-decode";

const LogInPage = (props) => {
    const history = useHistory();
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

    const RegisterFormSubmit = async (e) => {
        e.preventDefault();
        document.querySelector(".login_loading").style.display = "block"
        document.querySelector(".logIn_form_div").style.display = "none"

        const response = await fetch(`${BackendLink}/api/users/token/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                password
            })
        })
        const content = await response.json();
        try {

            if (content === "UNIQUE constraint failed: auth_user.username") {
                document.querySelector(".usernameerror").style.display = "block"
            }
            const content_decoded = jwt_decode(content.access)
            localStorage.setItem("accestoken", content.access)

            props.setProfileID(content_decoded.user_id)
            history.push("/")
        } catch {
            document.querySelector(".length_error").style.display = "block"
        }
    }


    return (
        <div className="signup_page">
            <div className="signin_main">
                <div className="form_part">
                    <Link to={'/'}>
                        <h1 className="logo" style={{
                            textAlign: "center", marginLeft: 0, fontSize: 45
                        }}>
                            Shu <span style={{ color: "#06c167" }}>Eats</span>
                        </h1>
                    </Link>

                    <div className='login_loading'>
                        <img className='loading_img' src="/images/fireloading.svg" alt="" />
                        <p style={{
                            textAlign: "center", fontSize: "20px", marginTop: "10px"
                        }}>
                            Loading...
                        </p>
                    </div>

                    <div className="logIn_form_div">
                        <form className="logIn_form" onSubmit={RegisterFormSubmit}>
                            <p className='lael'>Sign in with your email address or mobile number.</p>
                            <input type="text" required
                                placeholder="Username"
                                onChange={e => setusername(e.target.value)}
                            />
                            <p className="usernameerror">User name already exists</p>
                            <input type="password" required
                                placeholder="Password"
                                onChange={e => setpassword(e.target.value)}
                            />
                            <p className="length_error">
                                No active account found with the given credentials
                            </p>
                            <button className="signup_button">Sign Up</button>
                        </form>
                        <p style={{ marginTop: 10 }}>
                            Dont have an account? <Link to="/signup">Create account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogInPage
