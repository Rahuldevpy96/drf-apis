import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextInput from "../components/InputField/TextInput";
import PasswordInput from "../components/InputField/PasswordInput";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/user/login/`, { email, password });
            Cookies.set('isAuthenticated', 'true');
            Cookies.set('user', JSON.stringify(res.data?.data));
            console.log(res.data);
            // let idToken = user?.signInUserSession.getIdToken();
            // dispatch(setUser(idToken?.payload));
            navigate("/product");
        } catch (error) {
            console.log(error);
        }
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePassChange = (event) => {
        setPassword(event.target.value);
    };


    return (
        <div className="logIn_page">
            <div className="row">
                <div className="col-lg-7 col-md-12 col-sm-12">
                    <div className="login_form">
                        <div className="login_header">
                            <Link to="/"></Link>
                            <div className="lang_selector">
                                <p>
                                    Don’t have an account? <Link to="/Signup">Sign up!</Link>
                                </p>
                            </div>
                        </div>
                        <div className="form_area">
                            <div className="mb-5">
                                <h1>Welcome Back</h1>
                                <p className="mt-2 desc">
                                    <b>Login into your account</b>
                                </p>
                            </div>
                            <form className="input_form" onSubmit={handleSubmit}>
                                <TextInput
                                    type="text"
                                    name="email"
                                    value={email}
                                    placeholder="email"
                                    onChange={handleEmailChange}
                                />
                                <br />
                                <PasswordInput
                                    name="password"
                                    type="password"
                                    value={password}
                                    placeholder="Password"
                                    onChange={handlePassChange}
                                />

                                <button className="btn" type="submit">Sign In</button>
                            </form>

                        </div>
                    </div>
                </div>
                <div className="col-lg-5 col-md-12 col-sm-12">

                </div>
            </div>
        </div>
    );
}

export default Login;
