import img from "../../assets/images/notfound.jpg"
import "../../styles/log_in_page.css"

export default function LogInPage(){


    return(
        <div className="log-in-page-container">
            <div className="log-in-page-text-container">
                <h1 className="log-in-page-text">To start use this service,</h1>
                <h2 className="log-in-page-text">please Sign Up/Sign In</h2>
            </div>
            <form className="log-in-page-form">
                <div className="log-in-page-form-element">
                    <label id="nickname" htmlFor="nickname">Enter a nickname:</label>
                    <input type="text" name="nickname" id="nickname"/>
                </div>
                <div className="log-in-page-form-element">
                    <label id="password" htmlFor="password">Enter a password:</label>
                    <input type="password" name="password" id="password"/>
                </div>

                <hr className="navigation-button-separator"/>

                <div className="log-in-page-form-element">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}