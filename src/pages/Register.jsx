import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../utils/firebaseConfig"
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Register(){
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleRegister(e) {
      e.preventDefault();
    
      // Resetta i messaggi di errore e successo
      setError("");
      setSuccess("");
    
      // Controlla se le password combaciano
      if (password !== confirmPassword) {
        setError("Le password non combaciano.");
        return;
      }
    
      try {
        // Crea un nuovo utente con Firebase
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;
    
        // Crea un documento nella collezione "users"
        await setDoc(doc(db, "users", userId), {
            username: username,
            email: email,
            createdAt: new Date(),
        });
    
        setSuccess("Registrazione completata con successo! Puoi accedere ora.");
        setUsername("")
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } catch (err) {
        setError(err.message);
      }
    };

    return(
    <section className="container">
        <div className="row">
            <div className="col-12">
                <h1 className="my-4 text-center display-4 fw-bold title-font">Registrazione</h1>
            </div>
        </div>
        <div className="row justify-content-center align-items-center custom-h">
            <div className="col-12 col-lg-6">
                <div className="registerMenu">
                <form onSubmit={handleRegister}>
                    <div className="my-3">
                        <label htmlFor="username" className="">Username</label>
                        <input
                            type="text"
                            className="form-control bg-input"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
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
                    <div className="my-3">
                        <label htmlFor="confirmPassword" className="">Conferma Password</label>
                        <input
                            type="password"
                            className="form-control bg-input"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    {success && <p className="text-success">{success}</p>}
                    <button
                        type="submit"
                        className="w-100 btn btn-secondary"
                    >
                        Registrati
                    </button>
                    <div>
                        <p className="text-end">Hai già un account? <Link className="text-danger" to={"/login"}>Accedi</Link></p>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </section>
    )
}

