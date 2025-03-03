import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Controlla se l'utente è già loggato
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigate("/"); // Redirige alla homepage se l'utente è loggato
            }
        });
        return unsubscribe;
    }, [navigate]);


    async function handleLogin(e) {
        e.preventDefault();

        // Resetta i messaggi di errore
        setError("");

        try {
            // Effettua il login con Firebase
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError("Errore durante il login: " + err.message);
        }
    };

    return (
        <section className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="my-4 text-center display-4 fw-bold title-font">Login</h1>
                </div>
            </div>
            <div className="row justify-content-center align-items-center custom-h">
                <div className="col-12 col-lg-6">
                    <div className="registerMenu">
                        <form onSubmit={handleLogin}>
                            <div className="my-3">
                                <label htmlFor="email" className="">Email</label>
                                <input
                                    type="email"
                                    className="form-control bg-input"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="my-3">
                                <label htmlFor="password" className="">Password</label>
                                <input
                                    type="password"
                                    className="form-control bg-input"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="text-danger">{error}</p>}
                            <button
                                type="submit"
                                className="w-100 btn btn-secondary"
                            >
                                Accedi
                            </button>
                            <div>
                                <p className="text-end">Non hai un account? <Link className="text-danger" to={"/register"}>Registrati</Link></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
