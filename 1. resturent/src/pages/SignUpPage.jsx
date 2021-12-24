import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BackendLink } from '../Api/BackendLink';

const SignUpPage = () => {
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const RegisterFormSubmit = async (e) => {
        e.preventDefault();
        document.querySelector(".login_loading").style.display = "block"
        document.querySelector(".logIn_form_div").style.display = "none"

        const response = await fetch(`${BackendLink}/api/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                email,
                password
            })
        })
        const content = await response.json()

        if (content === "UNIQUE constraint failed: auth_user.username") {
            document.querySelector(".usernameerror").style.display = "block"
        }
        if (content === "length_error") {
            document.querySelector(".length_error").style.display = "block"
        }
        if (content === "digit_error") {
            document.querySelector(".digit_error").style.display = "block"
        }
        if (content === "uppercase_error") {
            document.querySelector(".uppercase_error").style.display = "block"
        }
        if (content === "lowercase_error") {
            document.querySelector(".lowercase_error").style.display = "block"
        }
        if (content === "symbol_error") {
            document.querySelector(".symbol_error").style.display = "block"
        }
        if (content === "sucess") {
            document.querySelector(".form_part").style.display = "none"
            document.querySelector(".sucessLogin").style.display = "block"
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
                    <h1 style={{ marginTop: 20 }}>Create an accout to get started</h1>

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
                            <input type="email" required
                                placeholder="Email"
                                onChange={e => setemail(e.target.value)}
                            />
                            <input type="password" required
                                placeholder="Password"
                                onChange={e => setpassword(e.target.value)}
                            />
                            <p className="length_error">Need At least 8 Charecters</p>
                            <p className="digit_error">Use Atlest one digit 0-9</p>
                            <p className="uppercase_error">Use uppercase letter A-Z</p>
                            <p className="lowercase_error">Use lowercase letters a-z</p>
                            <p className="symbol_error">Use some symbols @#$%^&*()</p>
                            <button className="signup_button">Sign Up</button>
                        </form>
                        <p style={{ marginTop: 10 }}>
                            Have an account? <Link to="/login">Log In</Link>
                        </p>
                    </div>
                </div>

                <div className="sucessLogin">
                    <h1 className="suceess_account">Account Create sucessfull</h1>
                    <Link to="/login">Log In</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUpPage