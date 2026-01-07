import AccountIcon from "../assets/icons/account_icon.svg";
import SettingsIcon from "../assets/icons/settings_icon.svg";
import LogOutIcon from "../assets/icons/log_out_icon.svg";
import "../styles/right_panel.css"
import { Link } from 'react-router-dom';
import { useAuth } from "./AuthContext";

export default function RightPanel() {
    const {signOut} = useAuth();

    async function handleLogOutButton() {
        try {
            await signOut();
        } catch(err) {
            console.log("Error during log out proccess!");
        }
    }

    return(
        <nav className="right-panel-container">
            <div className="account-icon-container">
                <img src={AccountIcon} alt="React Icon"/>
            </div>

            <div className="right-navigation-buttons-container">
                <hr className="navigation-button-separator"/>

                <Link className="button-nav button-settings" to="/settingsPage">
                    <div className="navigation-button-image-container">
                        <img src={SettingsIcon} alt="Folder Icon" className="navigation-button-image"/>
                    </div>
                    <div className="navigation-button-text-container">
                        <h3 className="navigation-button-text">Settings</h3>
                    </div>
                </Link>

                <hr className="navigation-button-separator"/>

                <Link className="button-nav button-log-out" onClick={handleLogOutButton}>
                    <div className="navigation-button-image-container">
                        <img src={LogOutIcon} alt="Folder Icon" className="navigation-button-image"/>
                    </div>
                    <div className="navigation-button-text-container">
                        <h3 className="navigation-button-text">Log Out</h3>
                    </div>
                </Link>

                <hr className="navigation-button-separator"/>
            </div>
        </nav>
    )
}