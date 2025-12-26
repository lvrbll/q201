import Header from "../Header"
import CardGallery from "../CardGallery"
import "../../styles/main_panel.css"

export default function MainPanel() {
    const header = "Home Page";

    return(
        <main className="main-panel-container">
            <Header header={header}/>
            <CardGallery />
        </main>
    )
}