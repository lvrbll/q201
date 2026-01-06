import { useState } from "react";
import img from "../../assets/images/notfound.jpg"
import "../../styles/log_in_page.css"
import { useNavigate } from "react-router-dom";

export default function LogInPage(props){
    const [currentForm, setCurrentForm] = useState(false);
    const navigate = useNavigate();

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

        await fetch("/api/registerNewUser", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password1
            })
        }).then(response => {
            if(response?.ok) {
                alert("User has been successfully created!")
                return;
            }
            alert("User already exists!");
        })
    }

    async function handleFormLogIn(e) {
        e.preventDefault();
        const formData = e.currentTarget;
        const username = formData[0].value;
        const password = formData[1].value;
        if (username === "" && username === null) return;
        if (password === "" && password === null) return;

        await fetch("/api/logInUser", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(response => {
            if(response?.ok) {
                props.onStateUpdate(response.json().isLogged);
                alert("Logged in!")
                navigate('/');
                return;
            }
            alert("Some data is wrong!");
        })
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