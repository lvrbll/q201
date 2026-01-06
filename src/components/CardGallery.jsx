import { useEffect, useState } from "react"
import "../styles/card_gallery.css"
import Card from "./Card.jsx"
import { useNavigate } from "react-router-dom";

export default function CardGallery() {
    const [cardsArray, setCardsArray] = useState([]);
    const navigate = useNavigate();

    async function fetchData() {
        const result = await fetch('/api/showAvailableCards');
        if (result.status === 401) {
            navigate('/');
            return;
        }
        const isOk = result.ok;
        if(isOk) {
            const data = await result.json();
            const outputArray = [];
            data.map(item => {
                const newCardObject = {
                    cardId: item.cardId,
                    cardName: item.cardName,
                    cardDescription: item.cardDescription,
                    cardImage: item.cardImage,
                    cardWordDefault: item.cardWordDefault,
                    cardWordTranslation: item.cardWordTranslation,
                    cardState: item.cardState,
                    cardQuantity: item.cardQuantity,
                }
                outputArray.push(newCardObject);
            })
            setCardsArray(outputArray);
            return;
        }
        console.log("No data have found");
    }

    useEffect(() => {
        fetchData();
    }, [])

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