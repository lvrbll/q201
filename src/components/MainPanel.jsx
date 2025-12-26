import Header from "./Header"
import CardGallery from "./CardGallery"
import "../styles/main_panel.css"

export default function MainPanel() {


    return(
        <main className="main-panel-container">
            <Header />
            <CardGallery />
        </main>
    )
}