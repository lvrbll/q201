import "../styles/new_card.css";
import { useState } from "react";
import green_icon from "../assets/icons/green_delete_icon.svg";
import blue_icon from "../assets/icons/blue_delete_icon.svg";

export default function NewCard() {
    const [quantity, setQuantity] = useState(0);
    const [wordFields, setWordFields] = useState([]);
    const [importTransWords, setImportTransWords] = useState([]);
     const [importDefWords, setImportDefWords] = useState([]);

    const importedFields = importedWords();
    
    function importedWords() {
        let tempOutput = [];
        for(var i = 0; i < importDefWords.length; i++) {
        tempOutput.push(
            <div className="card-form-word-container-main" key={i} data-idimport={i}>
                <div className="card-form-word-container import">
                    <div className="card-word-default-container import">
                        <label htmlFor="cardWordDefault" className="card-word-label">Enter a word: </label>
                        <input type="text" id="cardWordDefault" name="cardWordDefault" className="card-word-input" placeholder="Enter a word" value={importDefWords[i]} readOnly disabled/>
                    </div>
                    
                    <div className="card-word-separator-container import">
                        <hr className="navigation-button-separator import"/>
                    </div>

                    <div className="card-word-translation-container import">
                        <label htmlFor="cardWordTranslation" className="card-word-label">Enter a translation: </label>
                        <input type="text" id="cardWordTranslation" name="cardWordTranslation" className="card-word-input" placeholder="Enter a translation" value={importTransWords[i]} readOnly disabled/>
                    </div>
                </div>
                <div className="card-word-button-remove-container import">
                    <button className="card-word-button-remove import" type="button" onClick={(e) => handleRemoveClick(e)}>
                        <img src={blue_icon} alt="Delete Icon" className="button-delete-image import"/>
                    </button>
                </div>
            </div>
        );
        }
        return tempOutput;
    }

    function handleImportClick() {
            alert("You should divide your import text in a correct way. Example: Word default%word translated;");
            alert("Please, put your text into the next window!");
            let data = prompt();
            if(data === null || data === "" || data === undefined) {
                alert("Import can not be empty!");
                return;
            }
            let defaultWords = [];
            let translatedWords = [];
            const splittedArray = [];
            let temporaryWord = "";
            for(var i = 0; i < data.length; i++) {
                if(data[i] !== ";") {
                    temporaryWord += data[i];
                    continue;
                } 
                splittedArray.push(temporaryWord);
                temporaryWord = "";
            }
            splittedArray.map(item => {
                let res = item.split("%");
                defaultWords.push(res[0]);
                translatedWords.push(res[1]);
                return
            })

            if(defaultWords.length !== translatedWords.length || defaultWords.length === 0 || translatedWords.length === 0) {
                alert("A word is missing somewhere!");
                return;
            }

            setQuantity(quantity + defaultWords.length);
            defaultWords.map(item => {
                setImportDefWords(oldElements => [...oldElements, item]);
            })
            translatedWords.map(item => {
                setImportTransWords(oldElements => [...oldElements, item]);
            })
    }

    function handleRemoveClick(e) {
        if(quantity === 0) {
            alert("There is nothing to remove!");
            return;
        }

        let currentElement = Object.assign({}, e.currentTarget.parentElement.parentElement.dataset);
        let key = Object.keys(currentElement)[0];
        let index = Number(currentElement[key]);
        
        if(key === "iddefault") {
            let newArray = [...wordFields];
            newArray.splice(index, 1)
            setWordFields(newArray);
            setQuantity(q => q - 1);
            return
        }

        if(key === "idimport") {
            let newDefArray = [...importDefWords];
            let newTransArray = [...importTransWords];
            newDefArray.splice(index, 1);
            newTransArray.splice(index, 1);
            setQuantity(q => q - 1);
            setImportDefWords(newDefArray);
            setImportTransWords(newTransArray);
        }
    }

    function putToLocalStorage(card) {
        alert("Card has successfully added to collection!")
        if(localStorage.getItem("card") === null) {
            var array = [];
            array.push(card);
            localStorage.setItem("card", JSON.stringify(array));
            return;
        }

        var array = JSON.parse(localStorage.getItem("card"));
        array.push(card);
        localStorage.setItem("card", JSON.stringify(array))
    }

    function parseImage(img, card) {
        const fr = new FileReader();
        fr.readAsDataURL(img);
        fr.addEventListener('load', () => {
            const url = fr.result;
            card.cardImage = url;
            putToLocalStorage(card);
        });
    }

    function handleAddWordButtonClick() {
        setWordFields([...wordFields, 1]);
        setQuantity(quantity + 1);
    }

    function handleCardSubmit(e) {
        e.preventDefault();

        if(quantity === 0) {
            alert("You haven't added any words");
            return;
        }

        const cardName = e.currentTarget.elements.cardName.value;
        const cardDescription = e.currentTarget.elements.cardDescription.value;

        let t;
        if(e.currentTarget.elements.cardFileUpload.files[0] === undefined) {
            t = "empty";
        } else {
            t = e.currentTarget.elements.cardFileUpload.files[0];
        }
        const cardImage = t;

        const cardId = crypto.randomUUID();

        let cardWordDefaultArrayUnmapped = [];
        let cardWordTranslationArrayUnmapped = [];

        if(quantity === 1) {
            cardWordDefaultArrayUnmapped.push(e.currentTarget.elements.cardWordDefault);
            cardWordTranslationArrayUnmapped.push(e.currentTarget.elements.cardWordTranslation);
        } else {
            cardWordDefaultArrayUnmapped = Array.from(e.currentTarget.elements.cardWordDefault);
            cardWordTranslationArrayUnmapped = Array.from(e.currentTarget.elements.cardWordTranslation);
        }

        const cardWordDefaultArrayMapped = [];
        cardWordDefaultArrayUnmapped.map(item => {
            cardWordDefaultArrayMapped.push(item.value);
        })

        const cardWordTranslationArrayMapped = [];
        cardWordTranslationArrayUnmapped.map(item => {
            cardWordTranslationArrayMapped.push(item.value);
        })
        
        const card = {
                cardId: cardId,
                cardName: cardName, 
                cardDescription: cardDescription, 
                cardImage: "empty", 
                cardWordDefault: cardWordDefaultArrayMapped,
                cardWordTranslation: cardWordTranslationArrayMapped,
                cardQuantity: quantity
        }

        console.log(card);

        if(cardImage != "empty") {
            parseImage(cardImage, card);
            return;
        }

        putToLocalStorage(card);
    }

    return(
        <div className="new-card-container">
            <div className="card-form-title">
                <h3>Please, fill out the form</h3>
            </div>
            <form className="card-form-container" onSubmit={handleCardSubmit}>
                <label htmlFor="cardName" className="card-form-label">Enter a Card name: </label>
                <input type="text" id="cardName" name="cardName" className="card-form-input" placeholder="Card name" required/>

                <label htmlFor="cardDescription" className="card-form-label">Enter a Card description: </label>
                <input type="text" id="cardDescription" name="cardDescription" className="card-form-input" placeholder="Card description" required/>

                <label htmlFor="cardFileUpload" class="card-form-custom-upload">Select a Card image</label>
                <input type="file" id="cardFileUpload" name="cardFileUpload" className="card-form-image-input"/>

                <div className="card-add-button-word-container">
                    <button className="card-button-add-word" type="button" onClick={(e) => handleAddWordButtonClick(e)}>Add a word</button>
                    <button className="card-button-add-word" type="button" onClick={(e) => handleImportClick(e)}>Import</button>
                </div>
                

                {wordFields.map((item, key) => (
                    <div className="card-form-word-container-main" key={key} data-iddefault={key}>
                        <div className="card-form-word-container">
                            <div className="card-word-default-container">
                                <label htmlFor="cardWordDefault" className="card-word-label">Enter a word: </label>
                                <input type="text" id="cardWordDefault" name="cardWordDefault" className="card-word-input" placeholder="Enter a word" required/>
                            </div>
                            
                            <div className="card-word-separator-container">
                                <hr className="navigation-button-separator"/>
                            </div>

                            <div className="card-word-translation-container">
                                <label htmlFor="cardWordTranslation" className="card-word-label">Enter a translation: </label>
                                <input type="text" id="cardWordTranslation" name="cardWordTranslation" className="card-word-input" placeholder="Enter a translation" required/>
                            </div>
                        </div>
                        <div className="card-word-button-remove-container">
                        <button className="card-word-button-remove" type="button" onClick={(e) => handleRemoveClick(e)}>
                            <img src={green_icon} alt="Delete Icon" className="button-delete-image"/>
                        </button>
                        </div>
                    </div>
                ))}

                {importedFields}

                <hr className="navigation-button-separator"/>
                <button type="submit" className="card-form-button-submit">Submit the Card</button>
            </form>
        </div>
    );
}