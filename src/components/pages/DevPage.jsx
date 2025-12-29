

export default function() {
    
    function clearLS() {
        localStorage.clear();
    }

    function showLS() {
        JSON.parse(localStorage.getItem("card")).map(item => {
            console.log(item);
        })
    }

    function fillLS() {
        localStorage.setItem("card", prompt());
    }

    return(
        <>
            <button onClick={clearLS}>clear ls</button>
            <button onClick={showLS}>show ls</button>
            <button onClick={fillLS}>fill ls</button>
        </>
    )
}