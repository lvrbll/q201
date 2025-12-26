import ReactIcon from "../assets/icons/react_icon.svg";
import HomeIcon from "../assets/icons/home_icon.svg";
import FolderIcon from "../assets/icons/folder_icon.svg";
import "../styles/left_panel.css"

export default function LeftPanel() {


    return(
        <nav className="left-panel-container">

            <div className="react-icon-container">
                <img src={ReactIcon} alt="React Icon"/>
            </div>

            <div className="left-navigation-buttons-container">
                <hr className="navigation-button-separator"/>

                <button className="button-nav button-home">
                    <div className="navigation-button-image-container">
                        <img src={HomeIcon} alt="Folder Icon" className="navigation-button-image"/>
                    </div>
                    <div className="navigation-button-text-container">
                        <h3 className="navigation-button-text">Home</h3>
                    </div>
                </button>

                <hr className="navigation-button-separator"/>

                <button className="button-nav button-your-library">
                    <div className="navigation-button-image-container">
                        <img src={FolderIcon} alt="Folder Icon" className="navigation-button-image"/>
                    </div>
                    <div className="navigation-button-text-container">
                        <h3 className="navigation-button-text">Your Library</h3>
                    </div>
                </button>

                <hr className="navigation-button-separator"/>

            </div>

        </nav>
    )
}