import React, { useState, useEffect } from "react";
import { useSpells } from "../utils/SpellContext.jsx";
import { useUser } from "../utils/UserContext.jsx";
import { saveArrayElementInDocField } from "../utils/functions.js";
import { useNavigate } from "react-router-dom";

export default function CreateCharacterSpellList() {
    const { user } = useUser();
    const { spells } = useSpells();
    const navigate = useNavigate();

    const initialSpellSlots = Object.fromEntries(
        Array.from({ length: 10 }, (_, i) => [i.toString(), 0])
    );

    const initialSpells = Object.fromEntries(
        Array.from({ length: 10 }, (_, i) => [i.toString(), []])
    );

    const initialCharacter = {
        name: "",
        level: 1,
        class: "",
        spellSlots: initialSpellSlots,
        spells: initialSpells,
    };

    const [character, setCharacter] = useState(initialCharacter);
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [focusedInput, setFocusedInput] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate("/"); // Redirect se non loggato
        }
    }, [user, navigate]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCharacter((prev) => ({ ...prev, [name]: value }));
    };

    const handleSpellSlotsChange = (level, value) => {
        const numSlots = parseInt(value, 10) || 0;

        setCharacter((prev) => ({
            ...prev,
            spellSlots: {
                ...prev.spellSlots,
                [level]: numSlots,
            },
            spells: {
                ...prev.spells,
                [level]: Array(numSlots).fill(""),
            },
        }));
    };

    const handleSpellChange = (level, index, value) => {
        const updatedLevelSpells = [...character.spells[level]];
        updatedLevelSpells[index] = value;

        setCharacter((prev) => ({
            ...prev,
            spells: {
                ...prev.spells,
                [level]: updatedLevelSpells,
            },
        }));

        setSearchTerm(value);
        if (value.length > 0) {
            const filteredSpells = spells
                .filter(spell => spell.spellName.toLowerCase().includes(value.toLowerCase()))
                .slice(0, 5);
            setSuggestions(filteredSpells);
            setFocusedInput({ level, index });
        } else {
            setSuggestions([]);
            setFocusedInput(null);
        }
    };

    const selectSpell = (level, index, spellName) => {
        const updatedLevelSpells = [...character.spells[level]];
        updatedLevelSpells[index] = spellName;

        setCharacter((prev) => ({
            ...prev,
            spells: {
                ...prev.spells,
                [level]: updatedLevelSpells,
            },
        }));

        setSuggestions([]);
        setFocusedInput(null);
    };

    const handleSaveCharacter = async () => {
        if (!user) {
            alert("Devi essere loggato per salvare il personaggio.");
            return;
        }

        try {
            await saveArrayElementInDocField("users", user.uid, "characters", character);
            setCharacter(initialCharacter); // reset
        } catch (error) {
            console.error("Errore nel salvataggio del personaggio:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Gestione Incantesimi</h2>

            <div className="mb-3">
                <label className="form-label">Nome del Personaggio</label>
                <input type="text" name="name" className="form-control" value={character.name} onChange={handleInputChange} />
            </div>

            <div className="mb-3">
                <label className="form-label">Livello</label>
                <input type="number" name="level" className="form-control" value={character.level} min="1" max="20" onChange={handleInputChange} />
            </div>

            <div className="mb-3">
                <label className="form-label">Classe</label>
                <input type="text" name="class" className="form-control" value={character.class} onChange={handleInputChange} />
            </div>

            <hr />
            <h3>Numero di Incantesimi Conosciuti</h3>

            {Object.keys(character.spellSlots).map((level) => (
                <div key={level} className="mb-3">
                    <label className="form-label">Incantesimi di Livello {level}</label>
                    <input
                        type="number"
                        className="form-control"
                        value={character.spellSlots[level]}
                        min="0"
                        max="10"
                        onChange={(e) => handleSpellSlotsChange(level, e.target.value)}
                    />
                </div>
            ))}

            <hr />
            <h3>Lista Incantesimi</h3>

            {Object.entries(character.spells).map(([level, spellList]) => (
                spellList.length > 0 && (
                    <div key={level} className="mb-4">
                        <h4>Incantesimi di Livello {level}</h4>
                        {spellList.map((spell, index) => (
                            <div key={index} className="position-relative mb-2">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    value={spell}
                                    onChange={(e) => handleSpellChange(level, index, e.target.value)}
                                    onFocus={() => setFocusedInput({ level, index })}
                                    onBlur={() => setTimeout(() => setFocusedInput(null), 200)}
                                />
                                {focusedInput?.level === level && focusedInput?.index === index && suggestions.length > 0 && (
                                    <div className="suggestions-box border rounded w-100 shadow-sm">
                                        {suggestions.map((suggestion) => (
                                            <div
                                                key={suggestion.id}
                                                className="suggestion-item p-2 hover-bg-light"
                                                onMouseDown={() => selectSpell(level, index, suggestion.spellName)}
                                            >
                                                {suggestion.spellName}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )
            ))}

            <div className="text-center mt-4">
                <button className="btn btn-success" onClick={handleSaveCharacter}>
                    Salva Personaggio
                </button>
            </div>
        </div>
    );
}

