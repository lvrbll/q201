import "../../styles/settings_page.css"
import { useAuth } from "../AuthContext";
import Header from "../Header"

export default function SettingsPage() {
    const { updateUserData, removeUser } = useAuth();

    async function sendUpdateUserRequest(e) {
        e.preventDefault();
        const formData = e.currentTarget;
        const username = formData[0].value;
        const password = formData[1].value;
        if (username === "" && username === null) return;
        if (password === "" && password === null) return;

        updateUserData(username, password);
    }

    function handleRemoveUserClick() {
        removeUser();
    }

    return(
        <div className="main-panel-container">
            <Header header="Settings"></Header>
            <form method="POST" className="settings-page-form" onSubmit={(e) => sendUpdateUserRequest(e)}>
                <div className="settings-page-form-element">
                    <label id="username" htmlFor="username">Enter a new nickname:</label>
                    <input type="text" name="username" id="username"/>
                </div>
                <div className="settings-page-form-element">
                    <label id="password" htmlFor="password">Enter a new password:</label>
                    <input type="password" name="password" id="password"/>
                </div>

                <hr className="navigation-button-separator"/>

                <div className="settings-page-form-element">
                    <button type="submit">Update user data!</button>
                </div>
            </form>
            <div className="big-red-button">
                <button type="submit" onClick={handleRemoveUserClick}>REMOVE CURRENT USER</button>
            </div>
        </div>
    )
}