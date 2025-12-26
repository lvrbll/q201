import ReactIcon from "../assets/icons/react_icon.svg";
import HomeIcon from "../assets/icons/home_icon.svg";
import AddIcon from "../assets/icons/add_icon.svg";
import "../styles/left_panel.css"

export default function LeftPanel() {


    return(
        <nav className="left-panel-container">

            <div className="react-icon-container">
                <a href="https://www.youtube.com/watch?v=wgSssEh-NXA" target="_blank"><img src={ReactIcon} alt="React Icon"/></a>
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

                <button className="button-nav button-add-card">
                    <div className="navigation-button-image-container">
                        <img src={AddIcon} alt="Folder Icon" className="navigation-button-image"/>
                    </div>
                    <div className="navigation-button-text-container">
                        <h3 className="navigation-button-text">Add a Card</h3>
                    </div>
                </button>

                <hr className="navigation-button-separator"/>

            </div>

        </nav>
    )
}