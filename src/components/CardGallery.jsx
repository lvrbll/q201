import { useState } from "react"
import "../styles/card_gallery.css"
import Card from "./Card.jsx"

export default function CardGallery() {
    const [cardsArray, setCardsArray] = useState(() => {
        const stored = localStorage.getItem("card");
        return stored !== null ? JSON.parse(stored) : [];
    });
    
    return(
        <div className="card-gallery-container">
            {(cardsArray.length > 0) ? 
            cardsArray.map((item, key) => (
                    <Card 
                        key={key}
                        cardId = {item.cardId}
                        cardName={item.cardName} 
                        cardDescription={item.cardDescription} 
                        cardImage={item.cardImage} 
                        cardWordDefault={item.cardWordDefault} 
                        cardWordTranslation={item.cardWordTranslation}
                    />
            )) 
            : 
            <h1 className="card-gallery-warning">Nothing to show. Please, add a new Card!</h1>}
        </div>
    )
}