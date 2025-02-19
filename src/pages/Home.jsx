import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebaseConfig.js"


export default function Home(){

    const [spells, setSpells] = useState([]);

    useEffect(() => {
        const fetchSpells = async () => {
            try {
                const spellsCollection = collection(db, "spells"); // Nome della collezione in Firestore
                const spellsSnapshot = await getDocs(spellsCollection);
                const spellsList = spellsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setSpells(spellsList);
            } catch (error) {
                console.error("Errore durante il fetch degli incantesimi:", error);

            }
        };

        fetchSpells();
    }, []);



    return(
        <>
            <header className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center">Lista Incantesimi</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                    {spells.length > 0 ? (
                        <ul>
                            {spells.map((spell) => (
                                <li key={spell.id}>
                                    <strong>{spell.spellName}</strong> - {spell.magicSchool}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Non ci sono Incantesimi</p>
                    )}
                    </div>
                </div>
            </header>
        </>
    )
}