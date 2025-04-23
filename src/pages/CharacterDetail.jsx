import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig.js";

export default function CharacterDetail() {
    const { userId, characterId } = useParams();
    const navigate = useNavigate();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const userDoc = await getDoc(doc(db, "users", userId));
                if (!userDoc.exists()) {
                    console.error("Utente non trovato");
                    navigate("/");
                    return;
                }

                const userData = userDoc.data();
                const characterData = userData.characters?.find((char) => char.id === characterId);

                if (!characterData) {
                    console.error("Personaggio non trovato");
                    // navigate("/");
                    return;
                }

                setCharacter(characterData);
            } catch (error) {
                console.error("Errore nel recupero dei dati del personaggio:", error);
                // navigate("/");
            } finally {
                setLoading(false);
            }
        };

        fetchCharacter();
    }, [userId, characterId, navigate]);

    if (loading) {
        return <div>Caricamento in corso...</div>;
    }

    if (!character) {
        return <div>Personaggio non trovato</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center">{character.name}</h2>
            <div className="mb-3">
                <strong>Classe:</strong> {character.class}
            </div>
            <div className="mb-3">
                <strong>Livello:</strong> {character.level}
            </div>

            <h3>Incantesimi</h3>
            {Object.entries(character.spellSlots).map(([level, { slots, spells }]) => (
                <div key={level} className="mb-4">
                    <h4>Livello {level} (Slot: {slots})</h4>
                    <ul>
                        {spells.map((spell, index) => (
                            <li key={index}>{spell || "Nessun incantesimo assegnato"}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}