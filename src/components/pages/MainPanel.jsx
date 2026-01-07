import Header from "../Header"
import CardGallery from "../CardGallery"
import "../../styles/main_panel.css"
import { useAuth } from "../AuthContext";

export default function MainPanel() {
    const header = "Home Page";
    const { user } = useAuth();

    return(
        <main className="main-panel-container">
            <Header header={header}/>
            <div className="hello-header-container">
                <h1 className="hello-header">{"Hello, " + user + "!"}</h1>
            </div>
            <CardGallery />
        </main>
    )
}