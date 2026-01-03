import "../styles/card.css";
import img from "../assets/images/unknown_card_image.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Card(props) {
    const [image, setImg] = useState(() => {
        const img = new Image();
        return img.src = props.cardImage;
    });

    function handleButtonOpenClick() {
        
    }

    return(
        <article className="card-container">

            <div className="card-image-container">
                <img src={props.cardImage === "empty" || props.cardImage === "" ? img : image} className="card-image"></img>
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
                <Link className="card-button" to={`/cardPage/${props.cardId}`}>
                    <button className="card-button" onClick={() => handleButtonOpenClick()}>
                        Open
                    </button>
                </Link>
            </div>

        </article>
    );
}