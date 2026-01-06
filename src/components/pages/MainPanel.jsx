import Header from "../Header"
import CardGallery from "../CardGallery"
import "../../styles/main_panel.css"

export default function MainPanel(props) {
    const header = "Home Page";

    return(
        <main className="main-panel-container">
            <Header header={header}/>
            <div className="hello-header-container">
                <h1 className="hello-header">{"Hello, " + props.username + "!"}</h1>
            </div>
            <CardGallery />
        </main>
    )
}