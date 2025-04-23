import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../utils/UserContext.jsx";
import { auth } from "../utils/firebaseConfig.js";
import { signOut } from "firebase/auth";
import { fetchArrayFieldFromDoc } from "../utils/functions.js"

export default function Navbar() {
    const { user, userData } = useUser();
    const [characters, setCharacters] = useState([]);

    useEffect(() => {

            if (!user) return;
            const fetchCharacters = async () => {
                try {
                   const charactersData =  await fetchArrayFieldFromDoc("users", user.uid)
                   setCharacters(charactersData)
                } catch (error) {
                    console.error("Errore durante il fetch dei personaggi:", error);
                }
            }
            fetchCharacters();

    }, [user]);

    async function handleLogout() {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Errore durante il logout:", error);
        }
    }

    return (
        <nav className="navbar fixed-top">
            <div className="container-fluid d-flex">
                <button
                    className="navbar-toggler ms-auto btn-nav"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                    aria-label="Toggle navigation"
                >
                    <i className="bi bi-list color-p fs-2"></i>
                </button>

                <div
                    className="offcanvas offcanvas-end"
                    tabIndex="-1"
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                >
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                            {userData?.username || "Guest"}
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>

                            {user && (
                                <>
                                    <li className="nav-item">
                                        <button className="border-0 text-danger" onClick={handleLogout}>LogOut</button>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Characters
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link className="dropdown-item" to="/createCharacterSpellList">
                                                    Crea Nuova Lista
                                                </Link>
                                            </li>
                                            {characters.map((char, index) => (
                                                <li key={index}>
                                                    <Link 
                                                        to={`/user/${user.uid}/character/${char.id}`} 
                                                        className="dropdown-item">
                                                            {char.name} ({char.class} Lv.{char.level})
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}