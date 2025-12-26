import "../styles/card.css"
import img from "../assets/images/arsen_markaryan.jpg"

export default function Card() {

    return(
        <article className="card-container">

            <div className="card-image-container">
                <img src={img} className="card-image"></img>
            </div>

            <div className="card-info-container">
                <h3 className="card-title">
                    Card Example #1
                </h3>

                <h4 className="card-description">
                    о боже пицца. я хочу её
                </h4>

                <h4 className="card-quantity">
                    Card quantity 11.11
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