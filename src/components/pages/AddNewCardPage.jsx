import Header from "../Header.jsx";
import NewCard from "../NewCard.jsx"

export default function AddNewCardPage() {
    const header = "Make a new Card"

    return(
        <div className="main-panel-container">
           <Header header={header}/> 
           <NewCard />
        </div>
    );
}