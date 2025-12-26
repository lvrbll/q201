import "../styles/header.css"

export default function Header({ header }) {
    return(
        <header className="header">
            <h1>{header}</h1>
        </header>
    )
}