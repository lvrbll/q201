import { useNavigate, useParams } from "react-router-dom";
import "../../styles/card_learn_page.css";
import Header from "../Header";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../AuthContext";

export default function CardLearnPage() {
    const {id} = useParams();
    const [card, setCard] = useState(null);
    const [index, setIndex] = useState(0);
    const [currentCard, setCurrentCard] = useState([]);
    const { signOut } = useAuth();
    const [inputViewState, setIVstate] = useState("View");
    const currentWord = (currentCard[3] === "Default") ? currentCard[0] : currentCard[1];
    const navigate = useNavigate();


    async function fetchData() {
        const result = await fetch('/api/getSpecificCard', {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                cardId: id
            })
        });
        if(result.status === 401) {
            signOut();
            return;
        }
        const isOk = result.ok;
        if(isOk) {
            const data = await result.json();
            if(data === '' || data.length === 0) {
                setCard(null);
                return;
            }
            setCard(data);
            saveCurrentCardToLocalStorage(data);
            setCurrentCard([data.cardWordDefault[0], data.cardWordTranslation[0], data.cardState[0], "Default", index]);
            return;
        }
        console.log("No data have found");
    }

    async function sendUpdateRequest() {
        const request = await fetch("/api/updateCard", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                card: card
            })
        });
        
        const status = request.status;
        if(status === 401) {
            localStorage.clear();
            signOut();
        }

        const isOk = request.ok;
        if(!isOk) {
            console.log("Problem with card update");
        }

        localStorage.clear();
        navigate('/homePage');
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if(card === null) {
            return;
        }
        const newData = [
            card.cardWordDefault[index],
            card.cardWordTranslation[index],
            card.cardState[index],
            "Default",
            index
        ];
        setCurrentCard(newData);
    }, [index]);

    function saveCurrentCardToLocalStorage(data) {
        localStorage.setItem("card", JSON.stringify(data));
    }

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

        const newData = JSON.parse(localStorage.getItem("card"));
        newData.cardState[index] = newState;
        setCard(newData);
        saveCurrentCardToLocalStorage(newData);
    }

    function handleChangeWord(direction) {
        if(index === 0 && direction === "prev") {
            setIndex(prev => card.cardQuantity - 1)
            return;
        } 
        if(index === card.cardQuantity - 1 && direction === "next") {
            setIndex(prev => 0)
            return;
        }
        (direction === "next") ? setIndex(prev => prev + 1) : setIndex(prev => prev - 1);
    }

    function handleSaveClick() {
        sendUpdateRequest(card);
    }

    function handleNavigateClick(e) {
        setIVstate("Input");
    }

    function handleNavigateInput (e) {
        setIVstate("View");
        let value = Number(e.currentTarget.value);
        if (!(value > card.cardQuantity) && !(value <= 0)) {
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
            {(card === null) ? (<Header header="Loading..."/>) : 
            (
                <>
                    <Header header={`Card: ${card.cardName}`}/>
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
                                    (<input className="learn-navigation-element" type="number" min={0} max={card.cardQuantity} onMouseLeave={(e) => handleNavigateInput(e)}/>)
                                }
                                
                                <p className="learn-navigation-element">/</p>
                                <p className="learn-navigation-element">{card.cardQuantity}</p>
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
                </>
            )}; 
        </div>
    )
}