import { Link } from "react-router-dom";

export default function Footer(){
    return(
        <footer className="d-flex justify-content-center align-items-center">
            <Link className="footerLink fw-bold mx-2" to="/">Home</Link>
            <Link className="footerLink fw-bold mx-2" to="/dashboardSpells">Dashboard</Link>
        </footer>
    )
}