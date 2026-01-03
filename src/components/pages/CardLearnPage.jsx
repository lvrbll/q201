import { useParams } from "react-router-dom";
import "../../styles/card_learn_page.css";
import Header from "../Header";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function CardLearnPage() {

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
    const [index, setIndex] = useState(0);
    const [currentCard, setCurrentCard] = useState([
        card[0].cardWordDefault[0], 
        card[0].cardWordTranslation[0], 
        card[0].cardState[0],
        "Default",
        index
    ]);
    const [inputViewState, setIVstate] = useState("View");

    const currentWord = (currentCard[3] === "Default") ? currentCard[0] : currentCard[1];

    function handleClickShowOpposite() {
        setCurrentCard(prev => {
        return [
            prev[0],
            prev[1],
            prev[2],
            prev[3] === "Default" ? "Translated" : "Default"
        ];
        });
    }

    function handleChangeState(newState) {
        setCurrentCard(prev => {
        return [
            prev[0],
            prev[1],
            prev[2] = newState,
            prev[3] 
        ];
        });

        setCard(prev => {
           var newData = [...prev];
           newData[0].cardState[index] = newState; 
           return newData;
        })
    }

    function handleChangeWord(direction) {
        if(index === 0 && direction === "prev") {
            setIndex(prev => card[0].cardQuantity - 1)
            return;
        } 
        if(index === card[0].cardQuantity - 1 && direction === "next") {
            setIndex(prev => 0)
            return;
        }
        (direction === "next") ? setIndex(prev => prev + 1) : setIndex(prev => prev - 1);
    }

    useEffect(() => {
        const newData = [
            card[0].cardWordDefault[index],
            card[0].cardWordTranslation[index],
            card[0].cardState[index],
            "Default",
            index
        ];
        setCurrentCard(newData);
    }, [index]);

    function handleSaveClick() {
        const data = JSON.parse(localStorage.getItem("card"));
        const newDataElement = card[0];
        const newData = data.map(item => {
            if(item.cardId === newDataElement.cardId) {
                item = newDataElement;
            }
            return item;
        });

        localStorage.clear();
        localStorage.setItem("card", JSON.stringify(newData));
    }

    function handleNavigateClick(e) {
        setIVstate("Input");
    }

    function handleNavigateInput (e) {
        setIVstate("View");
        let value = Number(e.currentTarget.value);
        if (!(value > card[0].cardQuantity) && !(value <= 0)) {
            if(index === 0) {
                setIndex(prev => value);
            }
            setIndex(prev => value - 1);
            return;
        }
        alert("You can't navigate beyond min/max size");
    }

    return(
        <div className="main-panel-container">
            <Header header={`Card: ${card[0].cardName}`}/>

            <div className="learn-container">
                <div className="learn-general-container">
                    <button className="learn-buttons learn-general-buttons" onClick={() => handleChangeWord("prev")}>Previous</button>
                    <div className="learn-content-container" onClick={(e) => handleClickShowOpposite(e)}>
                        {currentWord}
                    </div>
                    <button className="learn-buttons learn-general-buttons" onClick={() => handleChangeWord("next")}>Next</button>
                </div>

                <div className="learn-utility-container">
                    <div className="learn-navigation-container">
                        {(inputViewState === "View") ? 
                            (<p className="learn-navigation-element" onClick={(e) => handleNavigateClick(e)}>{index + 1}</p>) 
                            : 
                            (<input className="learn-navigation-element" type="number" min={0} max={card[0].cardQuantity} onMouseLeave={(e) => handleNavigateInput(e)}/>)
                        }
                        
                        <p className="learn-navigation-element">/</p>
                        <p className="learn-navigation-element">{card[0].cardQuantity}</p>
                    </div>
                    <div className="learn-state-container">
                        <p className="learn-state-element">{"State: " + currentCard[2]}</p>
                    </div>
                    <div className="learn-utility-buttons-container">
                        <button className="learn-buttons" onClick={() => handleChangeState("studied")}>Mark as studied</button>
                        <button className="learn-buttons" onClick={() => handleChangeState("unstudied")}>Mark as unstudied</button>
                    </div>
                </div>

                <Link className="learn-save-exit-container" to={"/cardPage/" + id} onClick={(e) => handleSaveClick(e)}>
                    <button className="learn-buttons">Save and exit</button>
                </Link>
            </div>
        </div>
    )
}