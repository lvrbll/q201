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

    function handleClickButton(buttonKey) {
        const newInfo = prompt();
        if(newInfo === null || newInfo === undefined || newInfo === "") {
            alert("Field can't be empty");
            return;
        }

        const newCard = card.map(item => {
            const newItem = {}; 
            for (const [key, value] of Object.entries(item)) {
                if(key === buttonKey) {
                    newItem[key] = newInfo;
                    continue;
                }
                newItem[key] = value;
            }
            return newItem;
        });
        
        setCard(prev => {
            return prev = newCard;
        })
        updateLocalStorage(newCard)
    }

    function handleClickButtonImageChange(e) {
        const cardImage = e.target.files[0];
        if(cardImage === undefined) {
            alert("You must select an image to continue");
            return;
        }

        const fr = new FileReader();
        fr.readAsDataURL(cardImage);
        fr.addEventListener('load', () => {
            const newImage = fr.result;
            const newCard = card.map(item => {
                const newObject = {};
                for (const [key, value] of Object.entries(item)) {
                    if(key === "cardImage") {
                        newObject[key] = newImage;
                        continue;
                    }
                    newObject[key] = value;
                }

                setCard(card.map(item => {
                    return item = newObject;
                }))

                return newObject;
            })
            updateLocalStorage(newCard);
        });
    }

    function updateLocalStorage(newObject) {
        const data = JSON.parse(localStorage.getItem("card"));
        const newDataElement = newObject[0];
        const newData = data.map(item => {
            if(item.cardId === newDataElement.cardId) {
                item = newDataElement;
            }
            return item;
        });
        localStorage.clear();
        localStorage.setItem("card", JSON.stringify(newData));
    }

    return(
        <div className="main-panel-container">
            <Header header={"Card: " + card[0].cardName}/>

            <main className="card-page-container">
                <article className="card-page-showcase-container">
                    <div className="card-page-showcase-image-container">
                        <img src={card[0].cardImage} alt="Card Image"  className="card-page-showcase-image"/>
                    </div>
                    <div className="card-page-showcase-info-container">
                        <h3 className="card-page-text">General info about card</h3>
                        <div className="card-page-general-info-container">
                            <div className="card-page-showcase-info">
                                <p>Card name:</p>
                                <p>{" " + card[0].cardName}</p>
                            </div>
                            <div className="card-page-separator-container">
                                <hr className="navigation-button-separator"/>
                            </div>
                            <div className="card-page-showcase-info">
                                <p>Card description:</p>
                                <p>{" " + card[0].cardDescription}</p>
                            </div>
                            <div className="card-page-separator-container">
                                <hr className="navigation-button-separator"/>
                            </div>
                            <div className="card-page-showcase-info">
                                <p>Quantity of elements:</p>
                                <p>{" " + card[0].cardQuantity}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-page-showcase-buttons-container">
                        <button className="card-page-change-buttons card-page-change-name-button" onClick={() => handleClickButton("cardName")}>
                                Edit Card name
                        </button>
                        <button className="card-page-change-buttons card-page-change-description-button" onClick={() => handleClickButton("cardDescription")}>
                                Edit Card description
                        </button>
                        <div className="card-page-change-buttons card-page-file-upload-button">
                            <label htmlFor="cardPageFileUpload" className="card-page-label">
                            Edit Card image
                            </label>
                            <input id="cardPageFileUpload" name="cardPageFileUpload" type="file" onChange={(e) => handleClickButtonImageChange(e)}/>
                        </div>

                        {/* <button className="card-page-change-buttons card-page-change-image-button">
                            Edit Card image
                            <input type="file" className="card-page-change-buttons"></input>
                        </button> */}
                        
                    </div>
                </article>

                <div className="card-page-showcase-words-container">
                    <div className="card-page-words-container">
                        <div className="card-page-showcase-word">
                            <p>slowo 1slowo 1slowo 1slowo 1slowo 1slowo 1</p>
                        </div>
                        <div className="card-page-showcase-word">
                            <hr className="card-page-words-separator"></hr>
                        </div>
                        <div className="card-page-showcase-word">
                            <p>slowo 2</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}