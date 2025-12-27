import "../styles/new_card.css";
import { useState } from "react";

export default function NewCard() {
    const [quantity, setQuantity] = useState(0);
    const [wordFields, setWordFields] = useState([]);

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

    function handleRemoveWordButtonClick() {
        if(quantity === 0) {
            alert("There is no fields");
            return;
        }
        if(wordFields.length > 0) {
            let arr = wordFields
            arr.pop();
            setWordFields(arr);
            setQuantity(quantity - 1);
        }
    }

    function handleCardSubmit(event) {
        event.preventDefault();

        if(quantity === 0) {
            alert("You haven't added any words");
            return;
        }

        const cardName = event.currentTarget.elements.cardName.value;
        const cardDescription = event.currentTarget.elements.cardDescription.value;

        let t;
        console.log(event.currentTarget.elements.cardFileUpload.files[0])
        if(event.currentTarget.elements.cardFileUpload.files[0] === undefined) {
            t = "empty";
        } else {
            t = event.currentTarget.elements.cardFileUpload.files[0];
        }
        const cardImage = t;

        const cardId = crypto.randomUUID();

        if(quantity === 1) {
            const cardWordDefault = event.currentTarget.elements.cardWordDefault.value;
            const cardWordTranslation = event.currentTarget.elements.cardWordTranslation.value;
            
            // console.log(
            //     "Card name: " + cardName + " | " +
            //     "Card description: " + cardDescription + " | " +
            //     "Card image" + cardImage + " | " +
            //     "Card default words: " + cardWordDefault + " | " +
            //     "Card translated words: " + cardWordTranslation
            // );

            const card = {
                cardId: cardId,
                cardName: cardName, 
                cardDescription: cardDescription, 
                cardImage: "", 
                cardWordDefault: cardWordDefault,
                cardWordTranslation: cardWordTranslation
            }

            if(cardImage != "empty") {
                parseImage(cardImage, card);
                return;
            }

            putToLocalStorage(card);
            return;
        }

        const cardWordDefaultArrayUnmapped = Array.from(event.currentTarget.elements.cardWordDefault);
        const cardWordTranslationArrayUnmapped = Array.from(event.currentTarget.elements.cardWordTranslation);

        let temporaryDef = [];
        cardWordDefaultArrayUnmapped.map(item => {
            temporaryDef.push(item.value);
        })
        const cardWordDefaultArrayMapped = temporaryDef;

        temporaryDef = [];
        cardWordTranslationArrayUnmapped.map(item => {
            temporaryDef.push(item.value);
        })
        const cardWordTranslationArrayMapped = temporaryDef;
        
        // console.log(
        //     "Card name: " + cardName + " | " +
        //     "Card description: " + cardDescription + " | " +
        //     "Card image" + cardImage + " | " +
        //     "Card default words: " + cardWordDefaultArrayMapped + " | " +
        //     "Card translated words: " + cardWordTranslationArrayMapped
        // );

        const card = {
                cardId: cardId,
                cardName: cardName, 
                cardDescription: cardDescription, 
                cardImage: "", 
                cardWordDefault: cardWordDefaultArrayMapped,
                cardWordTranslation: cardWordTranslationArrayMapped
        }

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
                    <button className="card-button-add-word" type="button" onClick={() => handleAddWordButtonClick()}>Add a word</button>
                    <button className="card-button-add-word" type="button" onClick={() => handleRemoveWordButtonClick()}>Remove a word</button>
                </div>
                

                {wordFields.map((item, key) => (
                    <div className="card-form-word-container" key={key}>
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
                ))}

                <hr className="navigation-button-separator"/>
                <button type="submit" className="card-form-button-submit">Submit the Card</button>
            </form>
        </div>
    );
}