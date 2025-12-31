import Header from "../Header"

export default function ImportPage() {

    

    return(
        <div className="main-panel-container">
            <Header header={"Import a new Card"} />

            <div className="new-card-container">
            <div className="card-form-title">
                <h3>Please, fill out the form</h3>
            </div>

            

            {/* <form className="card-form-container" onSubmit={handleCardSubmit}>
                <label htmlFor="cardName" className="card-form-label">Enter a Card name: </label>
                <input type="text" id="cardName" name="cardName" className="card-form-input" placeholder="Card name" required/>

                <label htmlFor="cardDescription" className="card-form-label">Enter a Card description: </label>
                <input type="text" id="cardDescription" name="cardDescription" className="card-form-input" placeholder="Card description" required/>

                <label htmlFor="cardFileUpload" class="card-form-custom-upload">Select a Card image</label>
                <input type="file" id="cardFileUpload" name="cardFileUpload" className="card-form-image-input"/>

                <div className="card-add-button-word-container">
                    <button className="card-button-add-word" type="button" onClick={(e) => handleImportClick(e)}>Import</button>
                </div>

                <hr className="navigation-button-separator"/>
                <button type="submit" className="card-form-button-submit">Submit the Card</button>
            </form> */}
            </div>
        </div>
    )
}