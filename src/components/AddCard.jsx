import "../styles/add_card.css"

export default function AddCard() {

    return(
        <article className="add-card-container">
            <div className="card-container">
                <button className="add-card-button">
                    <img src="../assets/icons/add_icon.svg" alt="Add new card Icon" className="add-card-button-image"/>
                </button>
            </div>
        </article>
    );
}