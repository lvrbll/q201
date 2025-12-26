import { useState } from "react"
import "../styles/card_gallery.css"
import Card from "./Card.jsx"

export default function CardGallery() {
    const [cardsArray, setCardsArray] = useState(JSON.parse(localStorage.getItem("card")));

    return(
        <div className="card-gallery-container">
            {
                cardsArray.map((item, key) => (
                    <Card 
                        key={key} 
                        cardName={item.cardName} 
                        cardDescription={item.cardDescription} 
                        cardImage={item.cardDescription} 
                        cardWordDefault={item.cardWordDefault} 
                        cardWordTranslation={item.cardWordTranslation}
                    />
                ))
            }
        </div>
    )
}