import "../styles/card.css"
import img from "../assets/images/arsen_markaryan.jpg"

export default function Card(props) {

    return(
        <article className="card-container">

            <div className="card-image-container">
                <img src={props.cardImage === "empty" ? props.cardImage : img} className="card-image"></img>
            </div>

            <div className="card-info-container">
                <h3 className="card-title">
                    {props.cardName}
                </h3>

                <h4 className="card-description">
                    {props.cardDescription}
                </h4>

                <h4 className="card-quantity">
                    {Array.isArray(props.cardWordDefault) ? props.cardWordDefault.length + " words" : 1 + " word"} 
                </h4>
            </div>

            <div className="card-button-container">
                <button className="card-button">
                    Open
                </button>
            </div>

        </article>
    );
}