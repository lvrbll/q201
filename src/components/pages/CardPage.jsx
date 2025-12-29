import { useRef, useState } from "react";
import "../../styles/card_page.css";
import img from "../../assets/images/unknown_card_image.jpg"
import Header from "../Header";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function CardPage() {
    const {id} = useParams();
    const dialogChangeReference = useRef(null);
    const dialogAddReference = useRef(null);
    
    const [key, setKey] = useState(0);
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


    function toggleChangeDialog(e) {
        setKey(e.currentTarget.dataset.key);
        if(!dialogChangeReference.current) {
            return;
        }
        dialogChangeReference.current.hasAttribute("open")
            ? dialogChangeReference.current.close()
            : dialogChangeReference.current.showModal();
    
    }

    function changeWords(newDefaultWord, newTranslatedWord, targetKey) {
        if (checkIsEmpty(newDefaultWord, newTranslatedWord)) {
            closeDialog();
        }
        const newCard = card.map(item => {
                item.cardWordDefault[targetKey] = newDefaultWord;
                item.cardWordTranslation[targetKey] = newTranslatedWord;
                return item;
        })
        setCard(newCard);
        updateLocalStorage(newCard);
    }

    function handleChangeDialogForm(e) {
        const newDefaultWord = e.currentTarget.elements.defaultWord.value;
        const newTranslatedWord = e.currentTarget.elements.translatedWord.value;
        const targetKey = e.currentTarget.elements.wordKey.value;

        changeWords(newDefaultWord, newTranslatedWord, targetKey);
    }

    function handleAddDialogForm(e) {
        const newDefaultWord = e.currentTarget.elements.defaultWord.value;
        const newTranslatedWord = e.currentTarget.elements.translatedWord.value;

        addNewWords(newDefaultWord, newTranslatedWord);
    }

    function toggleAddDialog() {
        if(!dialogAddReference.current) {
            return;
        }
        dialogAddReference.current.hasAttribute("open")
            ? dialogAddReference.current.close()
            : dialogAddReference.current.showModal();
    
    }

    function addNewWords(newDefaultWord, newTranslatedWord) {
        if (checkIsEmpty(newDefaultWord, newTranslatedWord)) {
            closeDialog();
            return;
        }
        const newCard = card.map(item => {
            item.cardWordDefault.push(newDefaultWord);
            item.cardWordTranslation.push(newTranslatedWord);
            item.cardQuantity += 1;
            return item;
        })
        setCard(newCard);
        updateLocalStorage(newCard);
    }

    function closeDialog() {
        dialogChangeReference.current.close();
        dialogAddReference.current.close();
    }

    function checkIsEmpty(newDefaultWord, newTranslatedWord) {
        if(newDefaultWord === null || newDefaultWord === "" || newTranslatedWord === null || newTranslatedWord === "") {
            alert("New words can't be empty");
            return true;
        }
        return false;
    }

    function handleRemoveWords(e) {
        const elemnetIndex = e.currentTarget.form.firstChild.value;
        const newCard = card.map(item => {
            item.cardWordDefault.splice(elemnetIndex, 1);
            item.cardWordTranslation.splice(elemnetIndex, 1);
            item.cardQuantity -= 1;
            return item;
        });
        setCard(newCard);
        updateLocalStorage(newCard);
        closeDialog();
    }

    function handleDeleteCardClick (e) {
        const data = JSON.parse(localStorage.getItem("card"));
        const newData = data.map(item => {
            if(JSON.stringify(item) == JSON.stringify(card[0])) {
                console.log("xoxma")
                return null;
            }
            return item;
        }).filter((item) => item !== null);
        console.log(newData)
        localStorage.clear();
        localStorage.setItem("card", JSON.stringify(newData));
    }

    const words = renderWords();
    function renderWords() {
        const arrayDefaultWords = card[0].cardWordDefault;
        const arrayTranslatedWords = card[0].cardWordTranslation;
        const result = [];
        for(var i = 0; i < arrayDefaultWords.length; i++) {
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
        }
        return result;
    }

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
        <>
        <div className="main-panel-container">
            <Header header={"Card: " + card[0].cardName}/>
            <main className="card-page-container">
                <article className="card-page-showcase-container">
                    <div className="card-page-showcase-image-container">
                        <img src={card[0].cardImage === "empty" ? img : card[0].cardImage} alt="Card Image"  className="card-page-showcase-image"/>
                    </div>
                    <div className="card-page-showcase-info-container">
                        <h3 className="card-page-text">General info about card</h3>
                        <div className="card-page-general-info-container">
                            <div className="card-page-showcase-info">
                                <p className="card-page-paragraph">Card name:</p>
                                <p className="card-page-paragraph">{" " + card[0].cardName}</p>
                            </div>
                            <div className="card-page-separator-container">
                                <hr className="navigation-button-separator"/>
                            </div>
                            <div className="card-page-showcase-info">
                                <p className="card-page-paragraph">Card description:</p>
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
                        <Link className="card-page-delete-link" to="/" onClick={() => handleDeleteCardClick()}>
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

                    {words}
                </div>
            </main>
        </div>
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