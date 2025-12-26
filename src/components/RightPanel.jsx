import AccountIcon from "../assets/icons/account_icon.svg";
import SettingsIcon from "../assets/icons/settings_icon.svg";
import LogOutIcon from "../assets/icons/log_out_icon.svg";
import "../styles/right_panel.css"

export default function RightPanel() {


    return(
        <nav className="right-panel-container">
            <div className="account-icon-container">
                <img src={AccountIcon} alt="React Icon"/>
            </div>

            <div className="right-navigation-buttons-container">
                <hr className="navigation-button-separator"/>

                <button className="button-nav button-settings">
                    <div className="navigation-button-image-container">
                        <img src={SettingsIcon} alt="Folder Icon" className="navigation-button-image"/>
                    </div>
                    <div className="navigation-button-text-container">
                        <h3 className="navigation-button-text">Settings</h3>
                    </div>
                </button>

                <hr className="navigation-button-separator"/>

                <button className="button-nav button-log-out">
                    <div className="navigation-button-image-container">
                        <img src={LogOutIcon} alt="Folder Icon" className="navigation-button-image"/>
                    </div>
                    <div className="navigation-button-text-container">
                        <h3 className="navigation-button-text">Log Out</h3>
                    </div>
                </button>

                <hr className="navigation-button-separator"/>

            </div>
        </nav>
    )
}