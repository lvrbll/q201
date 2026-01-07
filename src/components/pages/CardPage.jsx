import { useRef, useState, useEffect } from "react";
import "../../styles/card_page.css";
import img from "../../assets/images/unknown_card_image.jpg";
import Header from "../Header";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function CardPage() {
    // Variables initialization
    const {id} = useParams();
    const navigate = useNavigate();
    const { signOut } = useAuth();

    const dialogChangeReference = useRef(null);
    const dialogAddReference = useRef(null);

    const [key, setKey] = useState(0);
    const [card, setCard] = useState(null);
    //------------------------------


    // Server functions
    async function fetchData() {
        const result = await fetch('/api/showAvailableCards');
        if(result.status === 401) {
            signOut();
            return;
        }
        const isOk = result.ok;
        if(isOk) {
            const data = await result.json();
            data.map(item => {
                if(item.cardId === id) {
                    setCard(item);
                    saveCurrentCardToLocalStorage(item);
                }
            })
            return;
        }
        console.log("No data have found");
    }

    async function sendRemoveRequest() {
        const request = await fetch("/api/removeCard", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                cardId: card.cardId
            })
        })
        const status = request.status;
        if(status === 401) {
            signOut();
            return;
        }
        const isOK = request.ok;
        if(isOK) {
            localStorage.clear();
            navigate('/homePage');
        }
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
    //------------------------------


    // Method which is observing state and changes some variables
    useEffect(() => {
        fetchData();
    }, []);
    //------------------------------


    // Function for saving/updating data to/in localStorage
    function saveCurrentCardToLocalStorage(card) {
        localStorage.setItem("card", JSON.stringify(card));
    }

    function updateLocalStorage(newObject) {
        localStorage.clear();
        localStorage.setItem("card", JSON.stringify(newObject));
    }
    //------------------------------


    //Block of dialog toggle functions
    function toggleChangeDialog(e) {
        setKey(e.currentTarget.dataset.key);
        if(!dialogChangeReference.current) {
            return;
        }
        dialogChangeReference.current.hasAttribute("open")
            ? dialogChangeReference.current.close()
            : dialogChangeReference.current.showModal();
    
    }

    function toggleAddDialog() {
        if(!dialogAddReference.current) {
            return;
        }
        dialogAddReference.current.hasAttribute("open")
            ? dialogAddReference.current.close()
            : dialogAddReference.current.showModal();
    
    }
    //------------------------------


    //Functions for handling dialog actions
    function handleChangeDialogForm(e) {
        e.preventDefault();
        const newDefaultWord = e.currentTarget.elements.defaultWord.value;
        const newTranslatedWord = e.currentTarget.elements.translatedWord.value;
        const targetKey = e.currentTarget.elements.wordKey.value;

        changeWords(newDefaultWord, newTranslatedWord, targetKey);
    }

    function handleAddDialogForm(e) {
        e.preventDefault();
        const newDefaultWord = e.currentTarget.elements.defaultWord.value;
        const newTranslatedWord = e.currentTarget.elements.translatedWord.value;

        addNewWords(newDefaultWord, newTranslatedWord);
    }
    //------------------------------


    //Functions for changing name/description/image of Card
    function handleClickButton(buttonKey) {
        const newInfo = prompt();
        if(newInfo === null || newInfo === undefined || newInfo === "") {
            alert("Field can't be empty");
            return;
        }

        const newCard = JSON.parse(localStorage.getItem("card"));
        (buttonKey === "cardName") ? newCard.cardName = newInfo : newCard.cardDescription = newInfo;
        updateLocalStorage(newCard);
        setCard(newCard);
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
            const newCard = JSON.parse(localStorage.getItem("card"));
            newCard.cardImage = newImage;
            updateLocalStorage(newCard);
            setCard(newCard);
        });
    }
    //------------------------------


    //Render words functions
    function renderWords() {
        if(card === null) {
            return;
        }
        const arrayDefaultWords = card.cardWordDefault;
        const arrayTranslatedWords = card.cardWordTranslation;
        const arrayState = card.cardState;
        const result = [];
        for(var i = 0; i < arrayDefaultWords.length; i++) {
            if(arrayState[i] === "unstudied") {
                result.push(<div className="card-page-words-container" data-key={i} key={i} onClick={toggleChangeDialog}>
                            <div className="card-page-showcase-word">
                                <p>{arrayDefaultWords[i]}</p>
                            </div>
                            <div className="card-page-showcase-word">
                                <hr className="card-page-words-separator"></hr>
                            </div>
                            <div className="card-page-showcase-word">
                                <p>{arrayTranslatedWords[i]}</p>
                            </div>
                </div>);  
            } else {
                result.push(<div className="card-page-words-container studied" data-key={i} key={i} onClick={toggleChangeDialog}>
                            <div className="card-page-showcase-word studied">
                                <p>{arrayDefaultWords[i]}</p>
                            </div>
                            <div className="card-page-showcase-word studied">
                                <hr className="card-page-words-separator studied"></hr>
                            </div>
                            <div className="card-page-showcase-word studied">
                                <p>{arrayTranslatedWords[i]}</p>
                            </div>
                </div>);  
            }
                      
        }
        return result;
    }
    //------------------------------


    //Words functions
    function changeWords(newDefaultWord, newTranslatedWord, targetKey) {
        if (checkIsEmpty(newDefaultWord, newTranslatedWord)) {
            closeDialog();
        }
        const newCard = JSON.parse(localStorage.getItem("card"));

        newCard.cardWordDefault[targetKey] = newDefaultWord;
        newCard.cardWordTranslation[targetKey] = newTranslatedWord;
        setCard(newCard);
        updateLocalStorage(newCard);
        closeDialog();
    }

    function addNewWords(newDefaultWord, newTranslatedWord) {
        if (checkIsEmpty(newDefaultWord, newTranslatedWord)) {
            closeDialog();
            return;
        }
        const newCard = JSON.parse(localStorage.getItem("card"));
        newCard.cardWordDefault.push(newDefaultWord);
        newCard.cardWordTranslation.push(newTranslatedWord);
        newCard.cardState.push("unstudied");
        newCard.cardQuantity = Number(newCard.cardQuantity);
        newCard.cardQuantity += 1;
        
        setCard(newCard);
        updateLocalStorage(newCard);
        closeDialog();
    }

    function handleRemoveWords(e) {
        const elemnetIndex = e.currentTarget.form.firstChild.value;
        const newCard = JSON.parse(localStorage.getItem("card"));
        newCard.cardWordDefault.splice(elemnetIndex, 1);
        newCard.cardWordTranslation.splice(elemnetIndex, 1);
        newCard.cardState.splice(elemnetIndex, 1);
        newCard.cardQuantity = Number(newCard.cardQuantity);
        newCard.cardQuantity -= 1;
        setCard(newCard);
        updateLocalStorage(newCard);
        closeDialog();
    }
    //------------------------------


    //Some additional utils functions
    function checkIsEmpty(newDefaultWord, newTranslatedWord) {
        if(newDefaultWord === null || newDefaultWord === "" || newTranslatedWord === null || newTranslatedWord === "") {
            alert("New words can't be empty");
            return true;
        }
        return false;
    }

    function handleDeleteCardClick (e) {
        sendRemoveRequest();
    }

    function handleSaveAndExitClick() {
        sendUpdateRequest();
    }

    function closeDialog() {
        dialogChangeReference.current.close();
        dialogAddReference.current.close();
    }
    //------------------------------

    return(
        <>
        {(card === null) ? (<Header header={"Loading..."}/>) : 
        (
            <div className="main-panel-container">
            <Header header={"Card: " + card.cardName}/>
            <main className="card-page-container">
                <article className="card-page-showcase-container">
                    <div className="card-page-showcase-image-container">
                        <img src={card.cardImage === "" ? img : card.cardImage} alt="Card Image"  className="card-page-showcase-image"/>
                    </div>
                    <div className="card-page-showcase-info-container">
                        <h3 className="card-page-text">General info about card</h3>
                        <div className="card-page-general-info-container">
                            <div className="card-page-showcase-info">
                                <p className="card-page-paragraph">Card name:</p>
                                <p className="card-page-paragraph">{" " + card.cardName}</p>
                            </div>
                            <div className="card-page-separator-container">
                                <hr className="navigation-button-separator"/>
                            </div>
                            <div className="card-page-showcase-info">
                                <p className="card-page-paragraph">Card description:</p>
                                <p>{" " + card.cardDescription}</p>
                            </div>
                            <div className="card-page-separator-container">
                                <hr className="navigation-button-separator"/>
                            </div>
                            <div className="card-page-showcase-info">
                                <p>Quantity of elements:</p>
                                <p>{" " + card.cardQuantity}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card-page-showcase-buttons-container">
                        <Link className="card-page-delete-link card-page-show-link" to={`/cardPage/cardLearnPage/${card.cardId}`}>
                            <button className="card-page-delete-button card-page-show-link">
                                Start learning process
                            </button>
                        </Link>
                        <button className="card-page-change-buttons card-page-change-name-button" onClick={() => handleClickButton("cardName")}>
                                Edit Card name
                        </button>
                        <button className="card-page-change-buttons card-page-change-description-button" onClick={() => handleClickButton("cardDescription")}>
                                Edit Card description
                        </button>
                        {/* <div className="card-page-change-buttons card-page-file-upload-button">
                            <label htmlFor="cardPageFileUpload" className="card-page-label">
                            Edit Card image
                            </label>
                            <input id="cardPageFileUpload" name="cardPageFileUpload" type="file" onChange={(e) => handleClickButtonImageChange(e)}/>
                        </div> */}
                        <Link className="card-page-delete-link exit-button" onClick={() => handleSaveAndExitClick()}>
                            <button className="card-page-delete-button exit-button">
                                Save and Exit
                            </button>
                        </Link>
                        <Link className="card-page-delete-link" onClick={() => handleDeleteCardClick()}>
                            <button className="card-page-delete-button">
                                Eradicate Card
                            </button>
                        </Link>
                    </div>
                </article>

                <div className="card-page-showcase-words-container">
                    <button className="card-page-change-buttons" onClick={(e) => toggleAddDialog(e)}>
                        Add a new word
                    </button>

                    {renderWords()}
                </div>
            </main>
        </div>
        )};
        <dialog className="card-page-dialog" ref={dialogChangeReference}>
            <form className="card-page-dialog-form-container" onSubmit={(e) => handleChangeDialogForm(e)}>
                <input type="text" id="wordKey" name="wordKey" value={key} className="word-key" readOnly/>
                <div className="dialog-general-container">
                    <div className="dialog-form-element">
                        <label htmlFor="defaultWord">Type a new default word:</label>
                        <input type="text" id="defaultWord" name="defaultWord"/>
                    </div>
                    <div className="dialog-form-element">
                        <label htmlFor="translatedWord">Type a new translated word:</label>
                        <input type="text" id="translatedWord" name="translatedWord"/>
                    </div>
                </div>
                <div className="dialog-buttons-container">
                    <button type="submit" className="button-dialog">Submit</button>
                    <button type="button" className="button-dialog" onClick={(e) => closeDialog(e)}>Cancel</button>
                    <button type="button" className="button-dialog" onClick={(e) => handleRemoveWords(e)}>Delete words</button>
                </div>
            </form>
        </dialog>
        <dialog className="card-page-dialog" ref={dialogAddReference}>
            <form className="card-page-dialog-form-container" onSubmit={(e) => handleAddDialogForm(e)}>
                <div className="dialog-general-container">
                    <div className="dialog-form-element">
                        <label htmlFor="defaultWord">Type a new default word:</label>
                        <input type="text" id="defaultWord" name="defaultWord"/>
                    </div>
                    <div className="dialog-form-element">
                        <label htmlFor="translatedWord">Type a new translated word:</label>
                        <input type="text" id="translatedWord" name="translatedWord"/>
                    </div>
                    <input type="text" id="wordKey" name="wordKey" value={key} className="word-key" readOnly/>
                </div>
                <div className="dialog-buttons-container">
                    <button type="submit" className="button-dialog">Submit</button>
                    <button type="button" className="button-dialog" onClick={(e) => closeDialog(e)}>Cancel</button>
                </div>
            </form>
        </dialog>
        </>
    )
}