import React, { createContext, useState, useEffect, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig.js";
import { fetchDataById } from "./functions.js"

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    // const [loading, setLoading] = useState(true);

    const refreshUserData = async () => {
        if (user) {
            try {
                await fetchDataById("users", user.uid, setUserData);
            } catch (error) {
                console.error("Errore durante l'aggiornamento dei dati utente:", error);
            }
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser); // Aggiorna lo stato utente autenticato
                try {
                    // Recupera i dati utente dal database
                    await fetchDataById("users", currentUser.uid, setUserData);
                } catch (error) {
                    console.error("Errore nel recupero dei dati utente:", error);
                }
            } else {
                setUser(null); // Rimuovi i dati utente
                setUserData(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{ user, userData, refreshUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);