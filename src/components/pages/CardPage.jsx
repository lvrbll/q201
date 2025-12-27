import { useState } from "react";
import "../../styles/card_page.css";
import Header from "../Header";
import { useParams } from "react-router-dom";

export default function CardPage() {
    const {id} = useParams();

    const [card, setCard] = useState(() => {
        const stored = localStorage.getItem("card");
        let a = JSON.parse(stored);
        const res = 
        a.map(item => {
            if(item.cardId === id) {
                return item;
            } else {
                return undefined;
            }
        });
        return res.filter((array) => array !== undefined);
    });

    return(
        <div className="main-panel-container">
            <Header header={"Card: " + card[0].cardName}/>

            <div className="card-showcase-container">
                
            </div>
        </div>
    )
}