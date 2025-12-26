import AccountIcon from "../assets/icons/account_icon.svg";
import SettingsIcon from "../assets/icons/settings_icon.svg";
import LogOutIcon from "../assets/icons/log_out_icon.svg";
import "../styles/right_panel.css"
import { Link } from 'react-router-dom';

export default function RightPanel() {


    return(
        <nav className="right-panel-container">
            <div className="account-icon-container">
                <img src={AccountIcon} alt="React Icon"/>
            </div>

            <div className="right-navigation-buttons-container">
                <hr className="navigation-button-separator"/>

                <Link className="button-nav button-settings" to="/accountSettingsPage">
                    <div className="navigation-button-image-container">
                        <img src={SettingsIcon} alt="Folder Icon" className="navigation-button-image"/>
                    </div>
                    <div className="navigation-button-text-container">
                        <h3 className="navigation-button-text">Settings</h3>
                    </div>
                </Link>

                <hr className="navigation-button-separator"/>

                <Link className="button-nav button-log-out" to="/">
                    <div className="navigation-button-image-container">
                        <img src={LogOutIcon} alt="Folder Icon" className="navigation-button-image"/>
                    </div>
                    <div className="navigation-button-text-container">
                        <h3 className="navigation-button-text">Log Out</h3>
                    </div>
                </Link>

                <hr className="navigation-button-separator"/>

                <Link className="button-nav button-log-in" to="/logInPage">
                    <div className="navigation-button-image-container">
                        <img src={LogOutIcon} alt="Folder Icon" className="navigation-button-image-log-in"/>
                    </div>
                    <div className="navigation-button-text-container">
                        <h3 className="navigation-button-text">Log In</h3>
                    </div>
                </Link>

                <hr className="navigation-button-separator"/>

            </div>
        </nav>
    )
}