import { useState } from "react";
import img from "../../assets/images/notfound.jpg"
import "../../styles/log_in_page.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; 

export default function LogInPage(){
    const [currentForm, setCurrentForm] = useState(false);
    const navigate = useNavigate();
    const { signIn, signUp } = useAuth();

    async function handleFormRegister(e) {
        e.preventDefault();
        const formData = e.currentTarget;
        const username = formData[0].value;
        const password1 = formData[1].value;
        const password2 = formData[2].value;
        if (username === "" && username === null) return;
        if (password1 === "" && password1 === null && password1 === undefined) return;
        if (password2 === "" && password2 === null && password2 === undefined) return;
        if (password1 !== password2) return;

        try {
            await signUp(username, password1);
            navigate('/')
        } catch (err) {
            console.log("Error during registration");
        }
    }

    async function handleFormLogIn(e) {
        e.preventDefault();
        const formData = e.currentTarget;
        const username = formData[0].value;
        const password = formData[1].value;
        if (username === "" && username === null) return;
        if (password === "" && password === null) return;

        try {
            await signIn(username, password);
            navigate('/homePage')
        } catch (err) {
            console.log("Error during log in");
        }
    }

    function handleChangeFormAction() {
        currentForm ? setCurrentForm(false) : setCurrentForm(true)
    }

    return(
        <div className="log-in-page-container">
            <div className="log-in-page-text-container">
                <h1 className="log-in-page-text">To start use this service,</h1>
                <h2 className="log-in-page-text">please Sign Up/Sign In</h2>
            </div>
            {(!currentForm) ? (
                    <form method="POST" className="log-in-page-form" onSubmit={(e) => handleFormRegister(e)}>
                    <div className="log-in-page-form-element">
                        <label id="username" htmlFor="username">Enter a nickname:</label>
                        <input type="text" name="username" id="username"/>
                    </div>
                    <div className="log-in-page-form-element">
                        <label id="password" htmlFor="password">Enter a password:</label>
                        <input type="password" name="password" id="password"/>
                    </div>
                    <div className="log-in-page-form-element">
                        <label id="password" htmlFor="password">Re-Enter a password:</label>
                        <input type="password" name="password" id="password"/>
                    </div>

                    <hr className="navigation-button-separator"/>

                    <div className="log-in-page-form-element">
                        <button type="submit">Register</button>
                    </div>
                </form>
            ) : (
                <form method="POST" className="log-in-page-form" onSubmit={(e) => handleFormLogIn(e)}>
                    <div className="log-in-page-form-element">
                        <label id="username" htmlFor="username">Enter your username:</label>
                        <input type="text" name="username" id="username"/>
                    </div>
                    <div className="log-in-page-form-element">
                        <label id="password" htmlFor="password">Enter your password:</label>
                        <input type="password" name="password" id="password"/>
                    </div>

                    <hr className="navigation-button-separator"/>

                    <div className="log-in-page-form-element">
                        <button type="submit">Log In</button>
                    </div>
                </form>
            )}
            <div className="log-in-page-button-change-element">
                <button className="log-in-page-button-change" onClick={() => handleChangeFormAction()}>Change form action</button>
            </div>
        </div>
    );
}